class CustomersController < ApplicationController
  before_action :set_customer, only: %i[ show edit update destroy ]

  # GET /customers or /customers.json
  def index
    @customers = Customer.all
  end

  # GET /customers/1 or /customers/1.json
  def show
  end

  # GET /customers/new
  def new
    @customer = Customer.new
  end

  # GET /customers/1/edit
  def edit
  end

  # POST /customers or /customers.json
  def create
    @customer = Customer.new(customer_params)

    if @customer.save
      send_to_n8n_webhook(@customer)
      redirect_to thank_you_customer_path(@customer) # Redirect to thank you page
    else
      puts @customer.errors.full_messages # Debugging
      render :new, status: :unprocessable_entity # Re-render the form with errors
    end
  end


  def thank_you
    @customer = Customer.find(params[:id]) # Find the customer by ID
  end






  # PATCH/PUT /customers/1 or /customers/1.json
  def update
    respond_to do |format|
      if @customer.update(customer_params)
        format.html { redirect_to @customer, notice: "Customer was successfully updated." }
        format.json { render :show, status: :ok, location: @customer }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @customer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /customers/1 or /customers/1.json
  def destroy
    @customer.destroy!

    respond_to do |format|
      format.html { redirect_to customers_path, status: :see_other, notice: "Customer was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_customer
      @customer = Customer.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def customer_params
      # params.expect(customer: [ :name, :email, :message, :project_type ])
      params.require(:customer).permit(:name, :email, :message, :project_type)
    end
  def send_to_n8n_webhook(customer)
    # Replace with your n8n webhook URL
    webhook_url = ENV['N8N_WEBHOOK_URL'] || 'https://betterwebco.app.n8n.cloud/webhook-test/3d2c63ed-9a2f-4ddb-a693-5e6d21df0d80'
    
    begin
      uri = URI.parse(webhook_url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = (uri.scheme == 'https')
      http.read_timeout = 10
      
      request = Net::HTTP::Post.new(uri.path, { 'Content-Type' => 'application/json' })
      
      # Prepare JSON payload
      payload = {
        customer_id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        message: customer.message,
        created_at: customer.created_at,
        timestamp: Time.current.iso8601
      }
      
      request.body = payload.to_json
      
      response = http.request(request)
      
      if response.code.to_i >= 200 && response.code.to_i < 300
        Rails.logger.info "Successfully sent customer data to n8n webhook: #{customer.id}"
      else
        Rails.logger.error "n8n webhook returned status #{response.code}: #{response.body}"
      end
      
    rescue StandardError => e
      # Log error but don't fail the customer creation
      Rails.logger.error "Failed to send to n8n webhook: #{e.message}"
    end
  end

  
end

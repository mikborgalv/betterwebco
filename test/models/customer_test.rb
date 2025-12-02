require "test_helper"

class CustomerTest < ActiveSupport::TestCase
  test "should not save customer without message" do
    customer = Customer.new
    assert_not customer.save, "Saved the customer without a message"
   end

   test "should not save customer without name" do
    customer = Customer.new
    assert_not customer.save, "Saved the customer without a name"
   end



end

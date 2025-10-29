import { supabase } from '../lib/supabase'

export class CartServices {
  
  static async checkout (
    userId: string | null,
    address: any,
    cartItems: any,
    itemCount: any,
    shipping: any,
    subtotal: any,
    total: any,
    isShipping: any
  ): Promise<any> {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        address_id: address,
        is_shipping: isShipping,
        order_details: {
          cartItems,
          itemCount,
          shipping,
          subtotal,
          total
        }
      })
      .select()

    if (error) {
      console.log(error)
      throw new Error('Failed to add order')
    }

    return { success: true, data: data[0] }
  }
}

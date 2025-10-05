import { supabase } from '../lib/supabase'

export class CartServices {
  static async checkout (
    userId: string | null,
    address: any,
    cartItems: any,
    itemCount: any,
    shipping: any,
    subtotal: any,
    total: any
  ): Promise<any> {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        address_id: address,
        order_details: { cartItems, itemCount, shipping, subtotal, total }
      })
      .select()

    if (error) {
      console.log(error)
      throw new Error('Failed to add order')
    }

    return { success: true, data: data[0] }
  }
}

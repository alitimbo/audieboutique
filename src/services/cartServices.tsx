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
    const { data, error } = await supabase.from('orders').insert({
      user_id: userId,
      address_id: address,
      order_details: { cartItems, itemCount, shipping, subtotal, total }
    })

    if (error) {
      console.log(error)
      throw error
      return { success: false }
    }

    return { success: true }
  }
}

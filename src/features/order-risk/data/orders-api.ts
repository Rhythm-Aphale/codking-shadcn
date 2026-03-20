import axios from 'axios'
import { type Order, type OrderWithRisk, enrichOrder, orderSchema } from './schema'

const ORDERS_API_URL =
  'https://cdn.shopify.com/s/files/1/0806/4876/5758/files/user_mock_data.json'

export async function fetchOrders(): Promise<OrderWithRisk[]> {
  const { data } = await axios.get<Order[]>(ORDERS_API_URL)
  return data.map((order) => {
    const parsed = orderSchema.parse(order)
    return enrichOrder(parsed)
  })
}

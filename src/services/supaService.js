import { supabase } from '../supabase'


export async function queryLocationOrder(locationId) {
    const { data, error } = await supabase
        .from('order_locations')
        .select('orders(type, created_at)')
        .eq('location_id', locationId)
        .order('orders(created_at)', { ascending: false })
        .limit(5);

    if (error) {
        console.error('Error fetching location order:', error);
        return null;
    }

    return data;
}

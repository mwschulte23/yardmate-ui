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

export async function queryServiceDay() {
    const { data, error } = await supabase
        .from('service_day')
        .select()
    
        if (error) {
            console.error('Error fetching service day: ', error)
            return null;
        }
        
        return data;
}

export async function queryLocationExtras(locationId) {
    const { data, error } = await supabase
        .from('location_extras')
        .select()
        .eq('id', locationId)
        .single()
    
        if (error) {
            console.error('Error fetching service day: ', error)
            return null;
        }
        return data;
}
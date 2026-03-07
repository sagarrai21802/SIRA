import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  try {
    
    // Create a Supabase client with the service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get the current time
    const now = new Date().toISOString()

    // Fetch all scheduled posts that are due
    const { data: posts, error } = await supabase
      .from('scheduled_posts')
      .select('id')
      .eq('status', 'scheduled')
      .lte('scheduled_at', now)

    if (error) {
      throw error
    }

    if (posts && posts.length > 0) {
      // Update the status of the due posts to 'published'
      const postIds = posts.map(p => p.id)
      const { error: updateError } = await supabase
        .from('scheduled_posts')
        .update({ status: 'published' })
        .in('id', postIds)

      if (updateError) {
        throw updateError
      }

      return new Response(JSON.stringify({ message: `Published ${posts.length} posts.` }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    } else {
      return new Response(JSON.stringify({ message: 'No posts to publish.' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

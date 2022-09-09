<script lang="ts">
  import { onMount } from 'svelte'
  import { useNavigate } from 'svelte-navigator'

  const api = 'http://localhost:8000'
  const lang = 'en'

  const navigate = useNavigate()
  let myHanko

  onMount(async () => {
    await import("http://localhost:9500/element.hanko-auth.js")
    // await import("@teamhanko/hanko-elements/hanko-auth")

    myHanko?.addEventListener('success', () => {
      navigate('/authorized')
    })
  })
</script>

<div>
  <hanko-auth bind:this={myHanko} {api} {lang} />
</div>


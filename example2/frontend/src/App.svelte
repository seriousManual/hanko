<script lang="ts">
  import { onMount } from 'svelte';

  onMount(async () => {
    // await import("http://localhost:9500/element.hanko-auth.js")
    await import("@teamhanko/hanko-elements/hanko-auth")
  })
</script>

<div>
  <hanko-auth api="http://localhost:8000" lang="de"></hanko-auth>
</div>
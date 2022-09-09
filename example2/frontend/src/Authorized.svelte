<script lang="ts">
  import { onMount } from 'svelte'
  import { useNavigate } from 'svelte-navigator'

  import type { somethingResponse } from '../../backend/server'

  let result: somethingResponse = []

  const navigate = useNavigate()

  onMount(async () => {
    const response = await fetch('/api/something')
    result = await response.json() as somethingResponse

    console.log(result)
  })

  async function logout() {
    await fetch('/api/logout', { method: 'POST' })
    navigate('/')
  }
</script>

{#if result.length > 0}
  <ul>
    {#each result as entry}
      <li>{entry.foo}</li>
    {/each}
  </ul>
{/if}

<button on:click={logout}>logout</button>
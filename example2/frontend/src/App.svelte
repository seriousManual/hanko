<script lang="ts">
  import { Router, Route } from 'svelte-navigator'

  import Authorized from './Authorized.svelte'
  import Login from './Login.svelte'
</script>

<Router>
	<div>
		<Route path="/" component={Login} />

		<Route path="/authorized" component={Authorized} />
	</div>
</Router>
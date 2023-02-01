<script lang="ts">
  import './login';
  import { STGeneralError } from 'supertokens-website/utils/error';
  import { createCode } from 'supertokens-web-js/recipe/passwordless';
  import Session from 'supertokens-web-js/recipe/session';
  import { onMount } from 'svelte';

  function isSuperTokenGeneralError(error: any): error is STGeneralError {
    return error.isSuperTokensGeneralError;
  }

  async function sendMagicLink(email: string) {
    try {
      let response = await createCode({
        email,
      });

      // Magic link sent successfully.
      window.alert('Please check your email for the magic link');
    } catch (err: unknown) {
      if (isSuperTokenGeneralError(err)) {
        // this may be a custom error message sent from the API by you,
        // or if the input email / phone number is not valid.
        window.alert(err.message);
      } else {
        window.alert('Oops! Something went wrong.');
      }
    }
  }

  let email = '';
  let loggedIn = false;
  onMount(async () => {
    // If the user is already logged in, redirect to the home page.
    if (await Session.doesSessionExist()) {
      loggedIn = true;
      let userId = await Session.getUserId();
      let accessTokenPayload = await Session.getAccessTokenPayloadSecurely();

      console.log(userId, accessTokenPayload.jwt);
    }
  });
</script>

{#if !loggedIn}
  <form on:submit|preventDefault={() => sendMagicLink(email)}>
    <input bind:value={email} type="text" placeholder="email" />
    <button type="submit">Send</button>
  </form>
{:else}
  <a href="/">Home</a>
{/if}

<script>
  import {questionApi} from "@modules/qna/api";

  let form = {
    topic: null
  }

  async function createTopic() {
    const response = await questionApi('/page', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: form.topic
      })
    })

    window.location.href=`topic?id=${response.id}`
  }
</script>

<form on:submit|preventDefault={createTopic}>
  <input type="text" placeholder="Topic" bind:value={form.topic}>
  <input type="submit" value="Create">
</form>

<script>
  let form = {
    question: null
  }

  $: questions = []

  function addQuestion() {
    questions = [...questions, form.question]
    form.question = null
  }
</script>

<div>
  <h1 contenteditable="true">What is the Q & A Topic? - <button>Save</button></h1>

  <form on:submit|preventDefault={addQuestion}>
    <input type="text" placeholder="Enter a question" bind:value={form.question} />
    <button type="submit">Add</button>
  </form>

  <ul>
    {#each questions as question}
    <li>{question}</li>
    {/each}
  </ul>
</div>
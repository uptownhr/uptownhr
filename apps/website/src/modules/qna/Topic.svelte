<script>
  import { onMount } from 'svelte';
  import { questionApi } from '@modules/qna/api';
  import Question from '@modules/qna/Question.svelte';

  const url = new URL(window.location.href);
  const id = parseInt(url.searchParams.get('id'));

  let topic;

  onMount(async () => {
    topic = await questionApi(`/page/${id}/questions`);
  });

  let form = {
    question: null,
  };

  async function addQuestion(q) {
    const question = await questionApi(`/question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: q,
        pageId: id,
      }),
    });

    topic.questions = [...topic.questions, question];
    form.question = null;
  }
</script>

<div>
  {#if topic}
    <h1>{topic.title}</h1>
  {/if}
  <form on:submit|preventDefault={() => addQuestion(form.question)}>
    <input
      type="text"
      bind:value={form.question}
      placeholder="What is your question?"
    />
    <input type="submit" value="Add Question" />
  </form>

  {#if topic}
    <ul>
      {#each topic.questions as question}
        <li>
          <Question {question} />
        </li>
      {/each}
    </ul>
  {/if}
</div>

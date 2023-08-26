<script>
  import { questionApi } from '@modules/qna/api';
  export let question;

  let form = {
    answer: null,
  };

  async function addAnswer(questionId, a) {
    const answer = await questionApi(`/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionId,
        value: a,
      }),
    });

    question.answers = [...question.answers, answer];

    form.answer = null;
  }
</script>

<div>
  {question.title} <br />
  Votes: {question.voteCount} | Answers: {question.answers.length}
  <ul>
    {#each question.answers as answer}
      <li>
        {answer.value}
      </li>
    {/each}
  </ul>
  <form on:submit|preventDefault={() => addAnswer(question.id, form.answer)}>
    <textarea bind:value={form.answer} />
    <input type="submit" value="Add Answer" />
  </form>
</div>

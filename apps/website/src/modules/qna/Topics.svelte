<script>
  import { onMount } from 'svelte';
  import { questionApi } from '@modules/qna/api';

  let topics = []

  onMount(async () => {
    topics = await questionApi('/pages');
  });
</script>

<div>
  <h2>Topics <a href="/tools/question-answer/new" style="float: right; font-size: 1rem">+ New Topic</a></h2>
  <ul>
    {#each topics as topic (topic.id)}
      <li><a href="/tools/question-answer/topic?id={topic.id}">{topic.title}</a></li>
    {/each}
  </ul>
</div>

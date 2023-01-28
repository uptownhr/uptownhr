<script>
  import { amortization } from './amortization.ts';
  import store from 'store';

  const loan = store.get('loan');

  let form = {
    terms: {
      amount: 10000,
      interestRate: 0.1,
      termLength: 3,
      startDate: '2023-01-01',
    },

    additionalPayments: '',
    ...loan,
  };

  $: schedule = amortization({
    principal: form.terms.amount,
    interestRate: form.terms.interestRate,
    termLength: form.terms.termLength,
    additionalPayments: form.additionalPayments.split(','),
    startDate: new Date(form.terms.startDate),
  });

  function saveLoan() {
    store.set('loan', form);
  }
</script>

<div>
  <form on:submit|preventDefault={saveLoan}>
    <label for="principal">Principal:</label>
    <input type="number" id="principal" bind:value={form.terms.amount} />
    <br />
    <label for="interestRate">Interest Rate:</label>
    <input
      type="number"
      id="interestRate"
      step="0.01"
      bind:value={form.terms.interestRate}
    />
    <br />

    <label for="term">Term (years):</label>
    <input type="number" id="term" bind:value={form.terms.termLength} />
    <br />
    <label for="additionalPayments">Additional Payments:</label>
    <input
      type="text"
      id="additionalPayments"
      bind:value={form.additionalPayments}
    />
    <br />
    <label for="startDate">Start Date:</label>
    <input type="date" id="startDate" bind:value={form.terms.startDate} />
    <button type="submit">Save</button>
  </form>
</div>

{#if schedule.payments.length}
  <table>
    <thead>
      <tr>
        <th>Month</th>
        <th>Due Date</th>
        <th>Interest</th>
        <th>Principal</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      {#each schedule.payments as payment}
        <tr>
          <td>{payment.month}</td>
          <td>{payment.dueDate.toLocaleDateString()}</td>
          <td>{payment.interest.toFixed(2)}</td>
          <td>{payment.principal.toFixed(2)}</td>
          <td>{payment.balance.toFixed(2)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div>
    <p>Total cost: {schedule.totalCost.toFixed(2)}</p>
  </div>
{/if}

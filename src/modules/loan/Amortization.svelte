<script>
  import { createLoan } from './useCases/createLoan';
  import { amortization } from './amortization';
  import store from 'store';

  const saved = store.get('loan');

  console.log('saved', saved);

  let principal = saved?.terms?.amount ?? 1000;
  let interestRate = saved?.terms?.interestRate ?? 0.1;
  let term = saved?.terms?.termLength ?? 5;
  let additionalPayments = '';
  let startDate = saved?.terms?.startDate ?? '2023-01-01';
  let schedule;

  $: schedule = amortization(
    principal,
    interestRate,
    term,
    additionalPayments.split(','),
    new Date(startDate)
  );

  function saveLoan() {
    let test = createLoan();

    test.setTerms({
      interestRate,
      startDate,
      amount: principal,
      termLength: term,
    });

    store.set('loan', test);

    const x = store.get('loan');
    console.log('x', x);
  }
</script>

<div>
  <form on:submit|preventDefault={saveLoan}>
    <label for="principal">Principal:</label>
    <input type="number" id="principal" bind:value={principal} />
    <br />
    <label for="interestRate">Interest Rate:</label>
    <input
      type="number"
      id="interestRate"
      step="0.01"
      bind:value={interestRate}
    />
    <br />

    <label for="term">Term (years):</label>
    <input type="number" id="term" bind:value={term} />
    <br />
    <label for="additionalPayments">Additional Payments:</label>
    <input
      type="text"
      id="additionalPayments"
      bind:value={additionalPayments}
    />
    <br />
    <label for="startDate">Start Date:</label>
    <input type="date" id="startDate" bind:value={startDate} />
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

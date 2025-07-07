import { attachmentTypes } from "./data";

export function aggregateAttachments(data) {
  const summary = {};

  data.forEach(({ module, style, customer, status, id }) => {
    const match = id.match(/^(WA\d+)/);
    const type = match ? match[1] : "UNKNOWN";

    if (!attachmentTypes.includes(type)) return; // Ignore invalid types

    const key = `${module}|${style}|${customer}`;
    if (!summary[key]) {
      summary[key] = {
        module, style, customer,
        counts: Object.fromEntries(attachmentTypes.map(t => [t, 0]))
      };
    }

    if (status === "In") summary[key].counts[type] += 1;
    if (status === "Out" || status === "Defective") summary[key].counts[type] -= 1;
  });

  return Object.values(summary);
}

export function aggregateByCustomer(data) {
  const result = {};
  data.forEach(({ customer, status }) => {
    if (!result[customer]) result[customer] = 0;
    if (status === "In") result[customer]++;
  });
  return result;
}

export function aggregateByModule(data) {
  const result = {};
  data.forEach(({ module, status }) => {
    if (!result[module]) result[module] = 0;
    if (status === "In") result[module]++;
  });
  return result;
}

export function aggregateStatusCounts(data) {
  const counts = { Defective: 0, InStorage: 0 };
  data.forEach(({ status }) => {
    if (status === "Defective") counts.Defective++;
    else if (status === "Out") counts.InStorage++;
  });
  return counts;
}

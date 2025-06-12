describe("getRevisionDates", () => {
  let getRevisionDates;

  beforeAll(async () => {
    const mod = await import("../date/revision.mjs");
    getRevisionDates = mod.getRevisionDates;
  });

  it("returns 5 future revision dates for a valid future start date", () => {
    const dates = getRevisionDates("2025-07-01", "Loops");

    expect(dates).toHaveLength(5);
    expect(dates[0]).toEqual({ topic: "Loops", date: "2025-07-08" });
    expect(dates[4]).toEqual({ topic: "Loops", date: "2026-07-01" });
  });

  it("does not include past dates when the start date is far in the past", () => {
    const dates = getRevisionDates("2020-01-01", "Variables");
    // All revision dates will be in the past, so result should be empty
    expect(dates).toHaveLength(0);
  });

  it("returns only future dates when some revision dates would be in the past", () => {
    const today = new Date();
    today.setDate(today.getDate() - 10); // 10 days ago
    const inputDate = today.toISOString().split("T")[0];

    const results = getRevisionDates(inputDate, "Functions");

    // Should return less than or equal to 5 because some intervals fall in the past
    expect(results.length).toBeLessThanOrEqual(5);
    results.forEach(r => {
      expect(new Date(r.date) >= new Date().setHours(0, 0, 0, 0)).toBe(true);
    });
  });

  expect(() => {
  getRevisionDates("not-a-date", "Invalid");
}).toThrow();
});

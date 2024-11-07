type FrequencyMap = { [k: string]: number };
type GroupedFreq = { [k: number]: string[] };

export class FreqMap {
  m: FrequencyMap = {};
  constructor() {}
  add(str: string) {
    if (this.m[str] !== undefined) {
      this.m[str]++;
      return;
    }
    this.m[str] = 1;
  }
  addMultiple(str: string[]) {
    str.forEach((s) => {
      if (this.m[s] !== undefined) {
        this.m[s]++;
        return;
      }
      this.m[s] = 1;
    });
  }
  groupByFreq() {
    const gp: GroupedFreq = {};
    Object.keys(this.m).forEach((k) => {
      const value = +this.m[k];
      if (gp[value] === undefined) {
        gp[value] = [];
      }
      gp[value].push(k);
    });
    return gp;
  }
}

/*!
 * perfmark <https://github.com/nivrith/perfmark>
 *
 * Copyright (c) Nivrith
 * Licensed under the MIT License.
 */

import ora from 'ora';
const Table = require('cli-table2')
import logdown from 'logdown';
import Benchmark from 'benchmark';
const debug = logdown('perfmark');
import {textSync} from 'figlet';
import chalk from 'chalk';

export interface BenchmarkResult extends Benchmark.Event {

  target: {
    name: string,
    hz: number,
    stats: any
  }
}

export interface PerfmarkOptions extends Benchmark.Options {

}

export class Perfmark {
  private suite: Benchmark.Suite;
  private result: BenchmarkResult[];
  private spinner: ora.Ora;
  constructor(name ? : string, options ? : PerfmarkOptions) {
    this.result = [];
    this.suite = new Benchmark.Suite(name, options);
    this.onCycle((result: BenchmarkResult) => {
      this.result.push(result)
      ora(result.target.name).succeed()
    });
    this.onComplete(() => {
      this.spinner.stop()
      debug.log()
      const orderedBenchmarkResults = this.sortDescResults(this.result)
      this.showResults(orderedBenchmarkResults)
    });
    this.spinner = ora('Running benchmark ')

  }

  get length() {
    return this.suite.length;
  }

  get aborted () {
    return this.suite.aborted;
  }

  get running() {
    return this.suite.running;
  }

  public add(name: string, fn: Function | string, options ? : PerfmarkOptions): Perfmark;

  public add(name: string, fn: Function | string, options ? : PerfmarkOptions) {
    this.suite.add(name, fn, options);
    return this;
  }
  public run(options: PerfmarkOptions = {
    'async': true
  }) {
    console.log(
      chalk.green(
        textSync('perfmark', {
          horizontalLayout: 'full'
        })
      )
    )
    this.spinner.start();
    this.suite.run(options);
    return this;
  }

  public onCycle(callback ? : Function | undefined) {
    if (callback) {
      this.suite.on('cycle', callback);
    }
    return this;
  }

  public onComplete(callback ? : Function | undefined) {
    if (callback) {
      this.suite.on('complete', callback);
    }
    return this;
  }

  public onError(callback ? : Function | undefined) {
    if (callback) {
      this.suite.on('error', callback);
    }
    return this;
  }

  public onReset(callback ? : Function | undefined) {
    if (callback) {
      this.suite.on('reset', callback);
    }
    return this;
  }

  public onStart(callback ? : Function | undefined) {
    if (callback) {
      this.suite.on('start', callback);
    }
    return this;
  }


  public onAbort(callback ? : Function | undefined) {
    if (callback) {
      this.suite.on('abort', callback);
    }
    return this;
  }

  public showResults(benchmarkResults: BenchmarkResult[]) {
    const table = new Table({
      head: ['NAME', 'OPS/SEC', 'RELATIVE MARGIN OF ERROR', 'SAMPLE SIZE']
    })
    benchmarkResults.forEach((result) => {
      table.push([
        result.target.name,
        result.target.hz.toLocaleString('en-US', {
          maximumFractionDigits: 0
        }),
        `± ${result.target.stats.rme.toFixed(2)}%`,
        result.target.stats.sample.length
      ])
    })
    console.log(table.toString())
  }


  private sortDescResults(benchmarkResults: any) {
    return benchmarkResults.sort((a: BenchmarkResult, b: BenchmarkResult) => a.target.hz < b.target.hz ? 1 : -1)
  }

};

export default Perfmark;
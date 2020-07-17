export const jobMutations = {
  setJob(state, job) {
    state.job = job;
  },
  setJobs(state, jobs) {
    state.jobs = jobs;
  },
};

export const jobGetters = {
  job: state => state.job || {},
  jobs: state => state.jobs || [],
};

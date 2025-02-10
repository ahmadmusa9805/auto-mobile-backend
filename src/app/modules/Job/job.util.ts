import { Job } from "./Job.model";
 
async function generateUniqueJobId() {
    let jobId;
    let isUnique = false;

    while (!isUnique) {
        jobId = `N${Math.floor(100000 + Math.random() * 900000)}`;
        const existingJob = await Job.findOne({ jobId });

        if (!existingJob) {
            isUnique = true;
        }
    }
    return jobId;
}

export default generateUniqueJobId;

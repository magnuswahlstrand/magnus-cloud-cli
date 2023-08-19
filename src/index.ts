// Run `npm start` to start the demo
import {cancel, confirm, intro, isCancel, outro, select, spinner, text,} from '@clack/prompts';
// import {setTimeout as sleep} from 'node:timers/promises';
import color from 'picocolors';

const delay = async (msDelay: number) => {
    return new Promise((resolve) => setTimeout(() => resolve(0), msDelay))
}

type projectTypes = "slow" | "fast" | "turbo"

const DELAY_TIMES_MS: Record<projectTypes, number> = {
    "slow": 100,
    "fast": 50,
    "turbo": 20,
}

async function main() {
    intro(color.inverse(' magnus-cloud-cli '));

    const name = await text({
        message: 'What is your name?',
        placeholder: 'Magnus',
    });

    if (isCancel(name)) {
        cancel('Operation cancelled');
        return process.exit(0);
    }


    while (true) {
        const isReady = await confirm({
            message: 'Are you ready?',
        });

        if (isCancel(isReady)) {
            cancel('Operation cancelled');
            return process.exit(0);
        }

        if (isReady)
            break
    }


    const projectType: projectTypes | symbol = await select({
        message: 'Pick a project type.',
        options: [
            {value: 'slow', label: 'Slow'},
            {value: 'fast', label: 'Fast'},
            {value: 'turbo', label: 'Turbo', hint: 'careful!'},
        ],
    });

    if (isCancel(projectType)) {
        cancel('Operation cancelled');
        return process.exit(0);
    }


    const s = spinner();
    s.start('Starting project');


    const delayTime = DELAY_TIMES_MS[projectType]
    for (let i = 0; i < 10; i++) {
        s.message(` ${i * 10} %`)
        await delay(delayTime);
    }

    s.stop('Project complete');

    outro("You're all set!");

    await delay(500);
}

main().catch(console.error);
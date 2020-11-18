import { alert, Stack } from '@pnotify/core';
    
export function notification (type = 'error', text = 'Smth. wrong!') {
    const notify = new Stack({ dir1: 'down', dir2: 'left', firstpos1: 50, firstpos2: 50 });
    const options = {
        type:     type,
        title:   'WRONG COUNTRY NAME',
        text:    'Try again or check item from dropdown list.',
        styling: 'brighttheme',
        delay:    3000,
        shadow:   true,
        stack:    notify,
    }
    alert(options);
};

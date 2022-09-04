import Link from 'next/link'
import { useRouter } from 'next/router';

import ThreadUpdateBtn from './ThreadUpdateBtn';
import ThreadAutoFetchCheckbox from './ThreadAutoFetchCheckbox';
import Countdown from './Countdown';

export default function ThreadControls({ autoUpdate, handleAutoUpdate }) {
    const router = useRouter();
    const { board } = router.query;

    return (
        <div className='thread-controls'>
            <Link href={`/${board}`}>
                <a>[Return]</a>
            </Link>
            <Link href={`/${board}/catalog`}>
                <a>[Catalog]</a>
            </Link>
            <a href='#bottom'>[Bottom]</a>
            <ThreadUpdateBtn />
            <ThreadAutoFetchCheckbox handleAutoUpdate={handleAutoUpdate} />
            {autoUpdate && <Countdown />}
        </div>
    )
}
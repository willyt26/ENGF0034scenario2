import { useState } from 'react';
import styles from './SubjectBin.module.css';

const SubjectBin = ({bin}) => {
    const [open, setOpen] = useState(false)
    const recentBins = bin.filter(e => Date.now() - e.time < 24 * 60 * 60 * 1000)
    const counts = recentBins.reduce((acc, entry) => {
        acc[entry.subject] = (acc[entry.subject] || 0) + 1;
        return acc;
    }, {})
    return (
        <div>
            <button className={styles.fab} onClick={() => setOpen(!open)}>🗑️</button>
            {open && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}
                    onClick={() => setOpen(false)}>
                    <div style={{ background: 'white', padding: '25px', borderRadius: '10px', minWidth: '300px' }}
                        onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginBottom: '14px' }}>
                            <span style={{ fontSize: '2rem' }}>👩‍💼</span>
                            <div style={{ background: '#f0f4ff', border: '1.5px solid #c5d0f0', borderRadius: '16px 16px 16px 4px', padding: '10px 14px', fontSize: '0.9rem' }}>
                                Here are all the subjects binned in the last 24 hours!
                            </div>
                        </div>
                        {Object.entries(counts).map(([subject, count]) => (
                            <p key={subject}>{subject}: {count}</p>
                        ))}
                        {Object.entries(counts).length === 0 && <p>No subjects binned yet!</p>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SubjectBin
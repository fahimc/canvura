import React from 'react';
export const LandingPage = () => {
    return (
        <div
            css={{
                minWidth: '100vw',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                background: `linear-gradient(0deg, rgba(53,135,180,1) 0%, rgba(166,223,217,1) 100%)`,
                padding: '10%',
                textAlign: 'center',
            }}
        >
            <img src="/assets/logo h white.png" css={{ width: '80vw' }}></img>
            <span css={{ fontFamily: ` 'Gabarito', sans-serif`, fontSize: '30px', fontWeight: '900' }}>
                Craft Your Creativity, Canvas Your Imagination
            </span>
            <p
                css={{
                    fontFamily: `'Tilt Neon', sans-serif`,
                    fontSize: '16px',
                    padding: '20px',
                    fontWeight: '400',
                    lineHeight: '20px',
                }}
            >
                Discover Canvura: Your open-source design playground. With a single click, our dynamic auto variant
                generation unfolds endless design possibilities. Dive into an array of templates, customize freely, and
                bring your creative visions to life effortlessly. Welcome to Canvura—where your imagination meets the
                canvas!
            </p>
            <a
                href={'/editor'}
                css={{
                    backgroundColor: '#405cf5',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '400',
                    fontFamily: `'Tilt Neon', sans-serif`,
                    ':hover': {
                        backgroundColor: '#6D81F5',
                    },
                }}
            >
                Open Editor
            </a>
        </div>
    );
};

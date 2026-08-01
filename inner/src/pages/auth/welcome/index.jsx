import './style.css';

export default function Welcome() {
    return (
        <>
            
            <header>
                <div className="navbar">

                    <span className="logo">
                        Inner<span className="logo-green">Voice</span>
                    </span>

                    <nav className="links">
                        <a href="#feature">Feature</a>
                        <a href="#privacy">Privacy</a>
                        <a href="#how-it-work">How it works</a>
                        <a href="#FAQ">FAQ</a>
                    </nav>

                    <div className="button">
                        <a href="#" className="btn">
                            Join anonymously
                        </a>
                    </div>

                </div>
            </header>


            
            <section className="hero">

                <div className="wrap hero-grid">

                   
                    <div className="hero-left reveal-in">

                        <div className="eyebrow">
                            ● AI-moderated · nothing tied to your name
                        </div>

                        <h1>
                            Who InnerVoice is.
                            <br />
                            when no one can.
                            <br />
                            see a name attached to it.
                        </h1>

                        <p className="lead">
                           InnerVoice is a place to say what you actually think. The brand exists to make that feel safe, not exposed.
                        </p>


                        
                        <div className="hero-button">

                            <a
                                href="#"
                                className="btn btn-primary"
                                id="heroCreateBtn"
                            >
                                Create your identity
                            </a>

                            <a
                                href="#"
                                className="btn btn-ghost"
                                id="heroBrowseFeedBtn"
                            >
                                Browse the feed
                            </a>

                        </div>


                        
                        <div className="stat-row">

                            <div className="stat">
                                <b className="mono">1.2M</b>
                                <span>voices shared</span>
                            </div>

                            <div className="stat">
                                <b className="mono">0</b>
                                <span>identities on file</span>
                            </div>

                            <div className="stat">
                                <b className="mono">98%</b>
                                <span>say they feel safer here</span>
                            </div>

                        </div>

                    </div>


                    {/* RIGHT SIDE */}
                    <div className="hero-right">

                        <div className="illustration">

                            <div className="avatar-head"></div>

                            <div className="avatar-body"></div>

                            <div className="voice-lines">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>
        </>
    );
}
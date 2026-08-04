import './style.css';

export default function Welcome() {
    return (
        <>
            {/* ================= NAVBAR ================= */}
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
                        <a href="#create" className="btn">
                            Join anonymously
                        </a>
                    </div>

                </div>
            </header>


            {/* ================= HERO ================= */}
            <section className="hero">

                <div className="wrap hero-grid">

                    {/* LEFT SIDE */}
                    <div className="hero-left">

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
                            InnerVoice is a place to say what you actually think.
                            The brand exists to make that feel safe, not exposed.
                        </p>


                        <div className="hero-button">

                            <a
                                href="#create"
                                className="btn btn-primary"
                            >
                                Create your identity
                            </a>

                            <a
                                href="#feature"
                                className="btn btn-ghost"
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


            {/* ================= THE PROBLEM ================= */}
            <section className="problem-section">

                <div className="welcome-container">

                    <p className="welcome-label">
                        THE PROBLEM
                    </p>

                    <h2>
                        Posting under your name invites judgment.
                        <br />
                        Posting under no name at all invites cruelty.
                    </h2>

                    <p className="problem-text">
                        Most people land somewhere in between — saying nothing,
                        and carrying it instead. InnerVoice was built for the
                        sentence you almost sent: a space with enough anonymity
                        to be honest, and enough structure to stay humane.
                    </p>

                </div>

            </section>


            {/* ================= WHAT MAKES IT SAFE ================= */}
            <section className="safe-section" id="feature">

                <div className="welcome-container">

                    <p className="welcome-label">
                        WHAT MAKES IT SAFE
                    </p>

                    <h2 className="section-heading">
                        Protection built into every screen,
                        <br />
                        not bolted onto the settings page
                    </h2>


                    <div className="safe-grid">

                        <div className="safe-card">

                            <div className="safe-icon">
                                ◈
                            </div>

                            <h3>An identity, not an account</h3>

                            <p>
                                A generated name, ID and avatar stand in for you.
                                We never collect a real name or email, so there's
                                nothing on file to leak.
                            </p>

                        </div>


                        <div className="safe-card">

                            <div className="safe-icon">
                                ◉
                            </div>

                            <h3>Moderation before you're seen</h3>

                            <p>
                                Every post is screened for identifying details,
                                self-harm signals and harassment before it ever
                                reaches another person.
                            </p>

                        </div>


                        <div className="safe-card">

                            <div className="safe-icon">
                                ◌
                            </div>

                            <h3>Anonymized voice & video</h3>

                            <p>
                                Pitch-shifted audio, blurred faces and stripped
                                metadata are built into the upload step.
                            </p>

                        </div>


                        <div className="safe-card">

                            <div className="safe-icon">
                                ◇
                            </div>

                            <h3>Small rooms, not audiences</h3>

                            <p>
                                Conversations happen in focused spaces instead
                                of being pushed toward the largest possible
                                audience.
                            </p>

                        </div>


                        <div className="safe-card">

                            <div className="safe-icon">
                                ⌛
                            </div>

                            <h3>Nothing lasts forever</h3>

                            <p>
                                Conversations are designed to be temporary,
                                reducing the pressure of leaving a permanent
                                public history behind.
                            </p>

                        </div>


                        <div className="safe-card">

                            <div className="safe-icon">
                                ▣
                            </div>

                            <h3>Protection by default</h3>

                            <p>
                                Privacy isn't something hidden inside a menu.
                                The safer choice is built into the experience
                                from the beginning.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= PRIVACY ================= */}
            <section
                className="conversation-section"
                id="privacy"
            >

                <div className="conversation-box">

                    <div className="conversation-left">

                        <p className="welcome-label">
                            NOT AN AUDIENCE
                        </p>

                        <h2>
                            Someone to talk to who
                            <br />
                            doesn't remember you asked
                        </h2>

                        <p className="conversation-description">
                            Ask about stress, work pressure, safety,
                            relationships or things you'd never say to
                            someone who knows you — privately, with
                            nothing tied back to your profile.
                        </p>


                        <div className="conversation-points">

                            <p>
                                <span>✓</span>
                                Crisis-aware responses that point to real,
                                human help
                            </p>

                            <p>
                                <span>✓</span>
                                Voice input for the days typing feels like
                                too much
                            </p>

                            <p>
                                <span>✓</span>
                                Conversations quietly delete themselves
                                after 30 days
                            </p>

                        </div>

                    </div>


                    {/* CHAT PREVIEW */}
                    <div className="chat-preview">

                        <div className="chat-message chat-user">
                            I keep saying I'm fine. I'm not, really.
                        </div>

                        <div className="chat-message chat-response">
                            That sounds heavy to carry alone. Want to
                            talk about what "not fine" looks like today,
                            or would a grounding exercise help more
                            right now?
                        </div>

                        <div className="chat-message chat-user chat-small">
                            Just talking helps.
                        </div>

                    </div>

                </div>

            </section>


            {/* ================= HOW IT WORKS ================= */}
            <section
                className="getting-started"
                id="how-it-work"
            >

                <div className="welcome-container">

                    <p className="welcome-label">
                        GETTING STARTED
                    </p>

                    <h2 className="section-heading">
                        Three steps to a voice that can't be traced
                        <br />
                        back
                    </h2>


                    <div className="steps-grid">

                        <div className="step-card">

                            <span className="step-number">
                                01
                            </span>

                            <h3>
                                Build your identity
                            </h3>

                            <p>
                                One tap generates your alias, ID and
                                avatar. No real name, email or phone
                                number is ever attached to it.
                            </p>

                        </div>


                        <div className="step-card">

                            <span className="step-number">
                                02
                            </span>

                            <h3>
                                Pick your room
                            </h3>

                            <p>
                                Anxiety, relationships, work, safety,
                                reviews — small rooms, each with its
                                own house rules and moderators.
                            </p>

                        </div>


                        <div className="step-card">

                            <span className="step-number">
                                03
                            </span>

                            <h3>
                                Speak, safely
                            </h3>

                            <p>
                                Moderation reviews what you wrote for
                                identifiers and harm before it becomes
                                part of the room.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= PRIVACY PROTECTION ================= */}
            <section className="protection-section">

                <div className="welcome-container protection-grid">

                    <div className="protection-content">

                        <p className="welcome-label">
                            PRIVACY BY DEFAULT
                        </p>

                        <h2 className="section-heading">
                            Protection shouldn't be something you have
                            to remember to turn on.
                        </h2>

                        <p className="conversation-description">
                            InnerVoice is designed so the safer option
                            comes first. Identity protection is part of
                            the experience instead of another setting
                            buried in a menu.
                        </p>

                    </div>


                    <div className="protection-options">

                        <div className="protection-option">

                            <div>
                                <strong>
                                    Hide identifying details
                                </strong>

                                <p>
                                    Detect personal information before
                                    publishing.
                                </p>
                            </div>

                            <div className="toggle active">
                                <span></span>
                            </div>

                        </div>


                        <div className="protection-option">

                            <div>
                                <strong>
                                    Voice protection
                                </strong>

                                <p>
                                    Change voice characteristics before
                                    audio is shared.
                                </p>
                            </div>

                            <div className="toggle active">
                                <span></span>
                            </div>

                        </div>


                        <div className="protection-option">

                            <div>
                                <strong>
                                    Remove metadata
                                </strong>

                                <p>
                                    Strip unnecessary information from
                                    uploaded media.
                                </p>
                            </div>

                            <div className="toggle active">
                                <span></span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= AUDIO PREVIEW ================= */}
            <section className="audio-section">

                <div className="welcome-container audio-grid">

                    <div className="audio-content">

                        <p className="welcome-label">
                            SPEAK WITHOUT EXPOSURE
                        </p>

                        <h2 className="section-heading">
                            Sometimes saying it is easier than
                            typing it.
                        </h2>

                        <p className="conversation-description">
                            InnerVoice can give people a way to speak
                            while keeping the experience focused on
                            what was said rather than who said it.
                        </p>

                    </div>


                    <div className="post-preview">

                        <div className="post-preview-top">

                            <div className="anon-avatar">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div>
                                <strong>QuietRiver_38</strong>
                                <p>anonymous voice</p>
                            </div>

                        </div>


                        <div className="audio-player">

                            <button
                                className="audio-play"
                                type="button"
                                aria-label="Play anonymous voice"
                            >
                                ▶
                            </button>


                            <div className="audio-wave">

                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>

                            </div>

                            <small>
                                0:24
                            </small>

                        </div>


                        <div className="protected-badge">
                            ✓ Identity protected
                        </div>

                    </div>

                </div>

            </section>


            {/* ================= FAQ ================= */}
            <section
                className="welcome-faq"
                id="FAQ"
            >

                <div className="faq-inner">

                    <p className="welcome-label">
                        BEFORE YOU TRUST US
                    </p>

                    <h2>
                        Questions people ask first
                    </h2>


                    <details className="faq-row">

                        <summary>
                            Is InnerVoice actually anonymous?
                            <span>+</span>
                        </summary>

                        <p>
                            InnerVoice is designed around generated
                            identities rather than public real-world
                            identity.
                        </p>

                    </details>


                    <details className="faq-row">

                        <summary>
                            How does the AI moderation actually work?
                            <span>+</span>
                        </summary>

                        <p>
                            Posts are checked before appearing to help
                            identify personal information, harmful
                            material and harassment.
                        </p>

                    </details>


                    <details className="faq-row">

                        <summary>
                            Can I share audio or video without being
                            identifiable?
                            <span>+</span>
                        </summary>

                        <p>
                            Voice, face and file protections are
                            designed to reduce identifying information
                            before media is shared.
                        </p>

                    </details>


                    <details className="faq-row">

                        <summary>
                            Why doesn't the feed just keep scrolling?
                            <span>+</span>
                        </summary>

                        <p>
                            InnerVoice focuses on smaller intentional
                            conversations rather than an endless
                            attention-driven feed.
                        </p>

                    </details>


                    <details className="faq-row">

                        <summary>
                            What happens if I delete my identity?
                            <span>+</span>
                        </summary>

                        <p>
                            Your anonymous identity is designed to
                            avoid becoming a permanent public profile.
                        </p>

                    </details>

                </div>

            </section>


            {/* ================= FINAL CTA ================= */}
            <section
                className="final-cta"
                id="create"
            >

                <div className="final-content">

                    <div className="mini-wave">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <h2>
                        Say the thing you've been
                        <br />
                        carrying.
                    </h2>

                    <p>
                        No real name. No public profile.
                        <br />
                        Just a place to speak.
                    </p>

                    <a
                        href="#"
                        className="final-button"
                    >
                        Create your anonymous identity
                    </a>

                </div>

            </section>


            {/* ================= FOOTER ================= */}
            <footer className="welcome-footer">

                <div className="welcome-container footer-inner">

                    <span className="logo">
                        Inner<span className="logo-green">Voice</span>
                    </span>


                    <nav className="footer-nav">

                        <a href="#feature">
                            Feature
                        </a>

                        <a href="#privacy">
                            Privacy
                        </a>

                        <a href="#how-it-work">
                            How it works
                        </a>

                        <a href="#FAQ">
                            FAQ
                        </a>

                    </nav>


                    <p className="footer-copy">
                        Speak freely. Stay protected.
                    </p>

                </div>

            </footer>
        </>
    );
}
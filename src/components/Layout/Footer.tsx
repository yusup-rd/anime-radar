import { FiPhone, FiMail, FiGithub } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="mt-auto bg-[#11111B] py-8">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* About the Website */}
          <div>
            <h3 className="text-primary mb-4 text-xl font-semibold">
              About AnimeRadar
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              Your ultimate destination for discovering and exploring anime.
              Search through thousands of anime titles, get detailed
              information, ratings, and more. Built with React, TypeScript, and
              powered by the Jikan API.
            </p>
          </div>

          {/* About Me */}
          <div className="md:text-right">
            <h3 className="text-primary mb-4 text-xl font-semibold">
              Developer
            </h3>
            <div className="text-foreground/80 space-y-2">
              <p className="text-foreground font-semibold">Yusup Rejebov</p>
              <a
                href="tel:+601767771570"
                className="hover:text-primary flex items-center gap-2 transition-colors md:justify-end"
              >
                <FiPhone />
                <span>+60 17 6771 570</span>
              </a>
              <a
                href="mailto:yusuprd@icloud.com"
                className="hover:text-primary flex items-center gap-2 transition-colors md:justify-end"
              >
                <FiMail />
                <span>yusuprd@icloud.com</span>
              </a>
              <a
                href="https://github.com/yusup-rd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary flex items-center gap-2 transition-colors md:justify-end"
              >
                <FiGithub />
                <span>github.com/yusup-rd</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-foreground/10 mt-8 border-t pt-6 text-center">
          <p className="text-foreground/60 text-sm">
            © {new Date().getFullYear()} AnimeRadar. Built with ❤️ for anime
            enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

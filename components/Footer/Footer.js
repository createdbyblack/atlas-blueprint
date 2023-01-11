import classNames from 'classnames/bind';
import Image from 'next/image';
import {
  // FaFacebookF,
  // FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import appConfig from 'app.config.js';

import { NavigationMenu } from '../';

import styles from './Footer.module.scss';

let cx = classNames.bind(styles);

/**
 * The Blueprint's Footer component
 * @return {React.ReactElement} The Footer component.
 */
export default function Footer({ menuItems }) {
  return (
    <footer className={cx('footer')}>
      <div className="container">

      <div className={cx('ftr_wrap')}>

        <div className="ftr_menu">
          <span>Explore</span>
          <NavigationMenu className={cx('nav')} menuItems={menuItems} />
        </div>
        

          {appConfig?.socialLinks && (
            <div className={cx('social-links')}>
              <span>Follow</span>
              <ul aria-label="Social media">
                {appConfig.socialLinks?.twitterUrl && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx('social-icon-link')}
                      href={appConfig.socialLinks.twitterUrl}
                    >
                      <FaTwitter title="Twitter" className={cx('social-icon')} />
                    </a>
                  </li>
                )}


                {appConfig.socialLinks?.linkedinUrl && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx('social-icon-link')}
                      href={appConfig.socialLinks.linkedinUrl}
                    >
                      <FaLinkedinIn
                        title="LinkedIn"
                        className={cx('social-icon')}
                      />
                    </a>
                  </li>
                )}

                {/* {appConfig.socialLinks?.facebookUrl && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx('social-icon-link')}
                      href={appConfig.socialLinks.facebookUrl}
                    >
                      <FaFacebookF
                        title="Facebook"
                        className={cx('social-icon')}
                      />
                    </a>
                  </li>
                )} */}

                {appConfig.socialLinks?.youtubeUrl && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx('social-icon-link')}
                      href={appConfig.socialLinks.youtubeUrl}
                    >
                      <FaYoutube title="YouTube" className={cx('social-icon')} />
                    </a>
                  </li>
                )}

                {appConfig.socialLinks?.instagramUrl && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx('social-icon-link')}
                      href={appConfig.socialLinks.instagramUrl}
                    >
                      <FaInstagram
                        title="Instagram"
                        className={cx('social-icon')}
                      />
                    </a>
                  </li>
                )}

                {/* {appConfig.socialLinks?.githubUrl && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx('social-icon-link')}
                      href={appConfig.socialLinks.githubUrl}
                    >
                      <FaGithub title="GitHub" className={cx('social-icon')} />
                    </a>
                  </li>
                )} */}

                
              </ul>
            </div>
          )}

          <div className="logo_item">
            <Image
              src="/logo.png"
              width={400}
              height={80}
              alt="Blueprint media logo"
              layout="responsive"
            />
          </div>
        </div>

        <div className={cx('copyright')}>
           <ul className="inline_ul">
            <li>
                &copy; {new Date().getFullYear()} Monocrom ApS{' '}
            </li>

            <li>
              <a href="#">Privacy Policy</a>
            </li>

            <li>
              <a href="#">Terms and Conditions</a>
            </li>

            <li>
              <a href="#">Sitemap</a>
            </li>
           </ul>

           <p>Created by <a href="https://createdbyblack.com/" target="_blank" rel="noopener noreferrer">Black</a></p>
          
        </div>
      </div>
    </footer>
  );
}

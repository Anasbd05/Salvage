import Link from "next/link";
import Image from "next/image";
import facebook from "@/assets/facebook.svg";
import instagram from "@/assets/instagram.svg";
import tiktok from "@/assets/tiktok.svg";
import whatsapp from "@/assets/whatsapp.svg";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center -mx-4  mb-4 group"
            >
              <Image
                src={"/logo.png"}
                alt=""
                width={70}
                height={70}
                className=" rounded-full "
              />

              <span className="font-bold -mx-2 text-xl text-gray-900">
                Salvage
              </span>
            </Link>

            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Service professionnel de lavage automobile à domicile. Nous
              prenons soin de votre véhicule avec des produits de qualité et un
              service rapide directement chez vous.
            </p>
            <nav>
              <div className="flex flex-row mt-6  gap-1">
                <Link
                  className="p-2 hover:bg-gray-200 rounded-md "
                  target="_blank"
                  href={
                    "https://www.facebook.com/profile.php?id=61575745809748&mibextid=wwXIfr&rdid=E5B6wYH1NuZ39RRu&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AyhPsmvkz%2F%3Fmibextid%3DwwXIfr#"
                  }
                >
                  <Image
                    src={facebook}
                    alt="Facebook"
                    width="24"
                    height="24"
                    className="fill-current"
                  />
                </Link>
                <Link
                  className="p-2 hover:bg-gray-200 rounded-md "
                  target="_blank"
                  href={"https://www.instagram.com/salva_lavage"}
                >
                  <Image
                    src={instagram}
                    alt="Instagram"
                    width="24"
                    height="24"
                    className="fill-current"
                  />
                </Link>
                <Link
                  className="p-2 hover:bg-gray-200 rounded-md "
                  target="_blank"
                  href={
                    "https://api.whatsapp.com/send/?phone=212678214955&text=Salut+%EF%BF%BD%EF%BF%BD&type=phone_number&app_absent=0"
                  }
                >
                  <Image
                    src={whatsapp}
                    alt="Whatsapp"
                    width="24"
                    height="24"
                    className="fill-current"
                  />
                </Link>
                <Link
                  className="p-2 hover:bg-gray-200 rounded-md "
                  target="_blank"
                  href={"https://www.tiktok.com/@lavagesalva"}
                >
                  <Image
                    src={tiktok}
                    alt="tiktok"
                    width="24"
                    height="24"
                    className="fill-current"
                  />
                </Link>
              </div>
            </nav>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>

            <ul className="space-y-2.5">
              <li>
                <Link
                  href="#services"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  href="#reviews"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Avis clients
                </Link>
              </li>

              <li>
                <Link
                  href="#faq"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/booking"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Réserver
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>

            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:lavagesalva@gmail.com"
                  className=" hover:underline underline-offset-2 text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Contact nous
                </a>
              </li>

              <li>
                <span className="text-gray-600 text-sm">Disponible 7j/7</span>
              </li>

              <li>
                <span className="text-gray-600 text-sm">
                  Service à domicile au Maroc
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-6 py-6">
        <p className="text-gray-600 text-sm text-center">
          © {currentYear} Salvage. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

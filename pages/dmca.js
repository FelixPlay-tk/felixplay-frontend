import Head from "next/head";

const Dmca = () => {
  return (
    <div className="max-w-7xl w-9/12 mx-auto py-8 lg:py-16">
      <Head>
        <title>DMCA Policy - FelixPlay</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="mb-5 mx-auto flex flex-col items-center justify-center">
        <h1 className="text-white font-bold text-xl tracking-wider text-center">
          DMCA Policy
          <div className="scale-x-150 h-1 rounded-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600" />
        </h1>
      </div>

      <section className="mt-8 space-y-8 text-gray-400 text-sm lg:text-base">
        <p>
          All parts of the FelixPlay website are for private use only. We DONOT
          host any TV Channels or Movies. All contents are taken from
          non-affiliated and third-party sites available in Internet. They are
          only indexed much like how Google works.
        </p>

        <p>
          FelixPlay does not accept responsibility for content hosted on third
          party websites and does not have any involvement in the
          downloading/uploading of movies .we just post links available in
          internet. This site merely indexes of other sites’s contents. The
          hosting server or the administrator cannot be held responsible for the
          contents of any linked sites or any link contained in a linked site,
          or changes / updates to such sites.
        </p>

        <p>
          FelixPlay is in compliance with 17 U.S.C. § 512 and the Digital
          Millennium Copyright Act (“DMCA”). It is our policy to respond to any
          infringement notices and take appropriate actions under the Digital
          Millennium Copyright Act (“DMCA”) and other applicable intellectual
          property laws. If your copyrighted material has been posted on
          FelixPlay or if links to your copyrighted material are returned
          through any search engine and you want this material removed, you must
          provide a written communication that details the information listed in
          the following section. Please be aware that you will be liable for
          damages (including costs and attorneys’ fees) if you misrepresent
          information listed on our site that is infringing on your copyrights.
          We suggest that you first contact an attorney for legal assistance on
          this matter.
        </p>

        <div>
          <h2 className="font-semibold">
            The following elements must be included in your copyright
            infringement claim:
          </h2>

          <ul className="list-outside list-disc px-8 mt-2 space-y-1">
            <li>
              Provide evidence of the authorized person to act on behalf of the
              owner of an exclusive right that is allegedly infringed.
            </li>
            <li>
              Provide sufficient contact information so that we may contact you.
              You must also include a valid email address.
            </li>
            <li>
              A statement that the complaining party has a good faith belief
              that use of the material in the manner complained of is not
              authorized by the copyright owner, its agent, or the law.
            </li>
            <li>
              A statement that the information in the notification is accurate,
              and under penalty of perjury, that the complaining party is
              authorized to act on behalf of the owner of an exclusive right
              that is allegedly infringed.
            </li>
          </ul>
        </div>

        <p>
          Must be signed by the authorized person to act on behalf of the owner
          of an exclusive right that is allegedly being infringed. Send the
          infringement notice via email to{" "}
          <a
            href="mailto:support@felixplay.tk"
            className="text-pink-600 cursor-pointer"
          >
            support@felixplay.tk
          </a>
          . Please allow us a week for an email response. Note that emailing
          your complaint to other parties such as our Internet Service Provider
          will not expedite your request and may result in a delayed response
          due the complaint not properly being filed.
        </p>
      </section>
    </div>
  );
};

export default Dmca;

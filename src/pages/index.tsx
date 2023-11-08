import config from '@/config/config';
import { fetchBuilderPageInfo } from '@/utils/common-utils';
import { builder, BuilderComponent, useIsPreviewing } from '@builder.io/react';
import HeadComponent from '@/components/shared/HeadComponent';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import FooterComponent from '@/components/shared/FooterComponent';

builder.init(config.BUILDER_IO_API_KEY);

export async function getStaticProps({ params }: any) {
    /*
    Fetch the first page from Builder that matches the current URL.
    The `userAttributes` field is used for targeting content,
    learn more here: https://www.builder.io/c/docs/targeting-with-builder
  */
    const page = await fetchBuilderPageInfo(builder, params);

    return {
        props: {
            page: page || null,
        },
        revalidate: 5,
    };
}



export default function HomePage({ page }: any) {
    const isPreviewing = useIsPreviewing();

    if (!page && !isPreviewing) {
        return <DefaultErrorPage statusCode={404} />;
    }
    return (
        <div>
            <Head>
                {/* Add any relevant SEO metadata or open graph tags here */}
                <title>{page?.data.title}  |  {page?.data.siteTitle}</title>
                <meta name='description' content={page?.data.description} />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://justsafefood.com/src/css/site.css" />
            </Head>
            <header>
                 <HeadComponent />
            </header>
            <BuilderComponent model='page' content={page} />

            <FooterComponent />
        </div>
    )
}

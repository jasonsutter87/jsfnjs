import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import HeadComponent from '@/components/shared/HeadComponent';
import { builder, BuilderComponent, useIsPreviewing } from '@builder.io/react';
import {
    fetchAllBuilderPages,
    fetchBuilderPageInfo,
} from '@/utils/common-utils';
import config from '@/config/config';

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

export async function getStaticPaths() {
    /*
    Fetch all published pages for the current model.
    Using the `fields` option will limit the size of the response
    and only return the `data.url` field from the matching pages.
  */
    const pages = await fetchAllBuilderPages(builder);
    return {
        paths: pages.map((page) => `${page.data?.url}`),
        fallback: true,
    };
}

export default function Page({ page }: any) {
    const router = useRouter();
    /*
    This flag indicates if you are viewing the page in the Builder editor.
  */
    const isPreviewing = useIsPreviewing();

    if (router.isFallback) {
        return <h1>Loading...</h1>;
    }

    /*
    Add your error page here. This will happen if there are no matching
    content entries published in Builder.
  */
    if (!page && !isPreviewing) {
        return <DefaultErrorPage statusCode={404} />;
    }


    
    return (
        <>
            <Head>
                {/* Add any relevant SEO metadata or open graph tags here */}
                <title>{page?.data.title}  |  {page?.data.siteTitle}</title>
                <meta name='description' content={page?.data.description} />
            </Head>
            <main>
                <div style={{ padding: 50, textAlign: 'center' }}>
                    {/* Put your header or main layout here */}
                    <HeadComponent />
                </div>

                {/* Render the Builder page */}
                <BuilderComponent model='page' content={page} />

                <div style={{ padding: 50, textAlign: 'center' }}>
                    {/* Put your footer or main layout here */}
                    Your footer
                </div>
            </main>
        </>
    );
}

import Link from 'next/link'
import React from 'react'

export default function FooterComponent() {
  return (
    <footer className="footer">
        <div className="site-container-1340">



            <div className="row justify-content-between align-items-center   desktop-footer-alt">
            <div className="col-12 col-lg-auto order-2 order-lg-1 t-c-l mt-4 mt-lg-0">
                <p className="copywrite mb-0">© 2023 Just.Safe.Food. | Powered by <Link className="bold mb-0" href="https://simplelearning.com" target="_blank">Simple</Link>&nbsp;<Link className="bold mb-0" href="https://simplelearning.com" target="_blank"><i className="far fa-external-link-square" aria-hidden="true"></i></Link></p>
            </div>
            <div className="col-12 col-lg d-flex justify-content-center justify-content-lg-end order-1 order-lg-2">
                <ul className="ul-reset d-flex align-items-center flex-column flex-lg-row">
                <li className="order-2 copywrite footer-link"><Link href="/terms">Terms of Use</Link></li>
                <li className="order-2 copywrite footer-link"><Link href="/privacy">Privacy Statement</Link></li>
                <li className="order-2 copywrite footer-link"><Link href="/accessibility">Accessibility</Link></li>

                <li className="order-1 order-lg-4 pt-3 pt-lg-0">
                    <Link href="https://onefairwage.site/" target="_blank">
                    <img src="/images/assets/footer/OFW-logo.png" alt="One Fair Wage logo" />
                    </Link>
                    
                </li>
                </ul>
            </div>
            </div>

        </div>
    </footer>
  )
}

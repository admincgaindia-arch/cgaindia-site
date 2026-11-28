// Shared legal text for CGA engagement letters and the Client Protection Kit.
// Kept in one place so the post-payment letter and the kit carry identical terms.
var CGA = {
  name: 'Canjain Global Advisors Private Limited',
  cin: 'U69201DL2025PTC450616',
  gstin: '07AAMCC8508Q1ZW',
  regd: 'Plot No. 1, Khasra No. 721, Burari, North Delhi - 110084',
  offices: 'Burari (Delhi) &middot; Noida &middot; Rohtak &middot; Safidon',
  web: 'www.cgaindia.com',
  mail: 'admin@cgaindia.com',
  phone: '+91 99966 47888'
};

var LEGAL_CSS = '<style>'
  + 'body{font-family:"Tinos","Times New Roman",Times,serif;font-size:12.6px;line-height:1.55;color:#111;margin:0;background:#fff}'
  + '.doc{max-width:760px;margin:0 auto;padding:4px 4px 22px}'
  + '.doc+.doc{page-break-before:always;border-top:1px solid #999;margin-top:30px;padding-top:24px}'
  + '.lh{display:flex;align-items:center;justify-content:space-between;gap:12px;border-bottom:2px solid #0b2f4a;padding-bottom:8px;margin-bottom:4px}'
  + '.lh img{height:46px;width:auto}.lh .co{text-align:right;font-size:10.6px;line-height:1.45;color:#333}'
  + '.lh .co b{display:block;font-size:13.5px;letter-spacing:.6px;color:#0b2f4a}'
  + '.lh2{font-size:9.6px;color:#555;text-align:right;margin:0 0 14px}'
  + '.clh{border-bottom:1px solid #444;padding-bottom:6px;margin-bottom:14px;text-align:center}'
  + '.clh b{font-size:14px;letter-spacing:.5px}.clh span{display:block;font-size:10.5px;color:#444}'
  + 'h1{font-size:14.5px;text-align:center;letter-spacing:.8px;margin:14px 0 4px;text-transform:uppercase}'
  + 'h1+.st{text-align:center;font-size:11px;color:#444;margin:0 0 14px;font-style:italic}'
  + 'h2{font-size:12.6px;margin:16px 0 4px;text-transform:uppercase;letter-spacing:.4px}'
  + 'p{margin:0 0 8px;text-align:justify}'
  + '.cl{margin:0 0 7px;text-align:justify;padding-left:34px;text-indent:-34px}'
  + '.cl>b:first-child{display:inline-block;width:34px;text-indent:0}'
  + '.sub{padding-left:62px;text-indent:-28px}.sub>b:first-child{width:28px}'
  + 'table.t{border-collapse:collapse;width:100%;margin:6px 0 10px}'
  + 'table.t th,table.t td{border:1px solid #777;padding:4px 6px;text-align:left;vertical-align:top;font-size:11.6px}'
  + 'table.t th{background:#f1f1f1;font-weight:bold}'
  + 'table.m{border-collapse:collapse;margin:4px 0 12px}table.m td{padding:1px 14px 1px 0;vertical-align:top}'
  + '.bl{display:inline-block;border-bottom:1px solid #555;min-width:110px}'
  + '.sig{margin-top:18px;page-break-inside:avoid}'
  + '.sg{font-family:"Great Vibes","Brush Script MT",cursive;font-size:27px;color:#14286b;line-height:1.15;margin-top:4px}'
  + '.ln{border-top:1px solid #333;width:250px;padding-top:2px}'
  + '.au{font-size:9.6px;color:#444;margin-top:4px;line-height:1.4}'
  + '.pend{margin-top:16px;padding:8px 10px;border:1px dashed #b07b00;color:#7a5600;font-size:11px;font-family:Arial,sans-serif}'
  + '.nt{font-size:10.4px;color:#444;font-style:italic}'
  + '.two{display:flex;gap:24px;justify-content:space-between;flex-wrap:wrap}.two>div{flex:1;min-width:230px}'
  + '.ft{font-size:9px;color:#666;text-align:center;margin-top:18px;border-top:1px solid #ccc;padding-top:4px}'
  + '@media print{.doc{max-width:none}.doc+.doc{border-top:0;margin-top:0}}'
  + '</style>';

function cgaLetterhead(e) {
  return '<div class="lh"><img src="https://cgaindia.com/assets/img/cga-logo.png" alt="CGA"><div class="co"><b>CANJAIN GLOBAL ADVISORS PRIVATE LIMITED</b>'
    + 'Tax &middot; Compliance &middot; Legal Advisory<br>'
    + 'Regd. Office: ' + CGA.regd + '<br>CIN ' + CGA.cin + ' &middot; GSTIN ' + CGA.gstin + '</div></div>'
    + '<div class="lh2">' + CGA.offices + ' &middot; ' + CGA.web + ' &middot; ' + CGA.mail + ' &middot; ' + CGA.phone + '</div>';
}

// Standard Terms of Engagement. o.e = escape function.
function cgaStandardTerms(o) {
  var n = 0;
  function H(t) { n++; return '<h2>' + n + '. ' + t + '</h2>'; }
  function C(k, t) { return '<p class="cl"><b>' + n + '.' + k + '</b>' + t + '</p>'; }
  return ''
    + '<h1>Standard Terms of Engagement</h1><div class="st">Annexed to and forming part of every engagement letter issued by Canjain Global Advisors Private Limited</div>'
    + H('Interpretation and application')
    + C(1, 'In these Standard Terms, <b>&ldquo;CGA&rdquo;</b> means Canjain Global Advisors Private Limited and, where the context requires, its directors, employees and the professionals associated with it; <b>&ldquo;Client&rdquo;</b> means the person or entity named in the engagement letter; <b>&ldquo;Services&rdquo;</b> means the services described in the engagement letter or in any later written confirmation; and <b>&ldquo;Authorised Person&rdquo;</b> means a person named as such by the Client under clause 4.')
    + C(2, 'These Standard Terms apply to the engagement letter to which they are annexed and to every other assignment undertaken by CGA for the Client, unless CGA and the Client agree otherwise in writing for a particular assignment. Where the engagement letter and these Standard Terms differ, the engagement letter prevails.')
    + C(3, 'Work requiring a certificate, audit report, appearance or opinion that may under law be issued only by a practising Chartered Accountant, Company Secretary, Cost Accountant or Advocate in his or her own name shall be undertaken by such a professional associated with CGA, who shall be separately responsible for it under the law and code of ethics governing his or her profession.')
    + H('Responsibilities of the Client')
    + C(1, 'The Client shall furnish complete, correct and timely information, records, explanations and confirmations, and in the case of periodic compliances not later than seven working days before the relevant statutory due date. CGA shall be entitled to rely on them without independent verification, unless verification is expressly included in the Services.')
    + C(2, 'The maintenance of books of account, the selection of accounting and tax positions, and the preparation of financial statements and returns are the responsibility of the Client and its management. CGA assists in their preparation on the basis of the information furnished. Unless an audit or review is expressly engaged, CGA does not audit, examine or certify that information, and its work cannot be relied upon to detect fraud, error or non-compliance.')
    + C(3, 'Every return, form, application, reply or document shall be filed only after it has been approved by the Client or an Authorised Person, in writing, by e-mail or by WhatsApp message from the contact details recorded with CGA. A filing so approved shall be treated for all purposes as made by the Client.')
    + C(4, 'The Client shall inform CGA in writing, within three days of receipt or occurrence, of every notice, summons, order or communication from any authority, and of any change in its constitution, directors, partners, shareholding, authorised signatories, bank mandates, address or business.')
    + H('Approval, time frames and limits of the Services')
    + C(1, 'Time frames stated by CGA are estimates which commence only on receipt of complete information and approvals. CGA shall not be responsible for any delay, late fee, interest or penalty attributable to late or incomplete information, delayed approval, non-payment of fees or government dues, or the failure, slowness or change of any government portal or authority.')
    + C(2, 'Advice is given on the law and administrative practice in force on the date it is given. CGA is not obliged to update completed advice for any subsequent change in law, judicial interpretation or facts unless separately engaged to do so.')
    + C(3, 'Oral or draft advice is provisional. Only advice confirmed by CGA in writing may be relied upon, and only by the Client for the purpose for which it is given.')
    + H('Authority to instruct and disputes within the Client')
    + C(1, 'CGA shall act on the instructions of the person who accepts the engagement letter and of the Authorised Persons named by the Client in its Declaration of Authorised Persons. Instructions received from the mobile numbers and e-mail addresses so recorded shall bind the Client. The Client may change its Authorised Persons only by written intimation signed by the persons competent to bind it.')
    + C(2, 'If CGA receives conflicting instructions, or becomes aware of any dispute among the directors, partners, members, trustees, shareholders or family members of the Client concerning its management, records or affairs, CGA may, without being in breach, suspend all work, filings and the release of records, credentials and documents until it receives joint written instructions signed by all persons concerned or an order of a competent court or tribunal.')
    + C(3, 'CGA is not a party to any such dispute and shall not be liable to the Client or to any of those persons for any loss, late fee, interest, penalty or prosecution arising from a suspension under this clause.')
    + H('Digital signatures, portal credentials and original records')
    + C(1, 'A Digital Signature Certificate (&ldquo;DSC&rdquo;) shall be held by CGA only under a Deed of Authorisation and Indemnity executed by its holder personally, and portal credentials shall be used only under a Letter of Authority issued by the Client. Every use shall be on the instruction or approval of the holder or of an Authorised Person.')
    + C(2, 'The mobile number and e-mail address registered on every statutory portal shall at all times be those of the Client or its own officers, and not of CGA or any of its personnel.')
    + C(3, 'Original documents, registers, cheque books, seals and DSC tokens shall be received and returned only against a written acknowledgement signed by both sides. A DSC shall be returned only to its holder or to a person holding the holder’s written authority.')
    + H('Fees, expenses and payment')
    + C(1, 'Fees are stated exclusive of Goods and Services Tax, which shall be charged in addition at the applicable rate. Government fees, stamp duty, late fees, interest, penalties, DSC charges and out-of-pocket expenses are borne by the Client at actuals and, where CGA so requires, shall be paid in advance.')
    + C(2, 'Invoices are payable within fifteen days of their date. Any amount remaining unpaid beyond thirty days shall carry interest at the rate of eighteen per cent per annum from the due date until payment.')
    + C(3, 'Where any invoice remains unpaid beyond thirty days, CGA may suspend the Services on written notice. CGA shall not be liable for any delay, late fee, interest or penalty arising during such suspension.')
    + C(4, 'Where a published fee is a starting fee, the final fee shall be fixed after review of the actual scope and confirmed in writing before the additional work is undertaken.')
    + H('Lien')
    + C(1, 'The Client agrees that CGA shall have a general lien, within the meaning of Section 171 of the Indian Contract Act, 1872, upon all books, records, documents and papers of the Client in its possession and upon all work product prepared by it, for all fees and expenses due to it on any account, and may retain the same until those dues are paid in full.')
    + C(2, 'No lien shall be exercised over a DSC, which shall be returned to its holder on written request, or over any document the retention of which is prohibited by law or by the code of ethics applicable to the professional concerned.')
    + H('Limitation of liability')
    + C(1, 'The aggregate liability of CGA, whether in contract, tort (including negligence) or otherwise, for all claims arising out of or in connection with an assignment shall not exceed the professional fees actually received by CGA for that assignment in the financial year to which the claim relates.')
    + C(2, 'CGA shall not be liable for any indirect or consequential loss, loss of profit, business or goodwill, or for any tax, interest, late fee or penalty which would in any event have been payable by the Client, or which arises from information that was incorrect, incomplete or furnished late.')
    + C(3, 'Nothing in these Standard Terms limits any liability which cannot lawfully be limited, including liability for fraud or wilful default.')
    + H('Indemnity')
    + C(1, 'The Client shall indemnify and keep indemnified CGA, its directors, employees and associated professionals against all claims, demands, proceedings, losses, penalties, costs and expenses (including reasonable legal fees) arising from (a) any information, document or instruction furnished by or on behalf of the Client that is false, incomplete or misleading; (b) any filing made on the approval of the Client or an Authorised Person; (c) the use of the Client’s portal credentials or DSC by any person other than CGA’s own personnel; or (d) any dispute among the Client’s owners, directors, partners, members, trustees or management.')
    + H('Confidentiality and personal data')
    + C(1, 'CGA shall keep confidential all information received from the Client and shall use it only for the Services, save where disclosure is required by law, by a regulator or professional body, or by an order of a court or authority, or is made to CGA’s professional advisers or insurers on a confidential basis.')
    + C(2, 'The Client consents, and confirms that it has obtained the consent of its directors, partners, employees and signatories, to the processing of their personal data by CGA for the Services in accordance with the Digital Personal Data Protection Act, 2023 and the privacy policy published at cgaindia.com/privacy.html.')
    + H('Independence and conflicts of interest')
    + C(1, 'Where CGA, any of its directors or their relatives holds shares in, is a director or partner of, or has given a loan to the Client, that interest shall be disclosed in writing and recorded in a Disclosure of Interest and Consent signed by all directors or partners of the Client before the Services commence or continue.')
    + C(2, 'Any statutory audit of the Client shall be conducted by an auditor appointed by the Client in accordance with law, who shall be independent of CGA as required by law and by the applicable code of ethics.')
    + H('Working papers')
    + C(1, 'Working papers, computations, notes and drafts prepared by CGA are its property. CGA shall retain them for the period prescribed by law or by the applicable professional standards and may then destroy them without notice. Copies of final returns, forms and acknowledgements shall be furnished to the Client.')
    + H('Electronic communication and acceptance')
    + C(1, 'Communication by e-mail and WhatsApp to and from the contact details recorded by the Client constitutes valid written communication for every purpose of the engagement. The Client accepts the risks inherent in electronic communication.')
    + C(2, 'An engagement letter, these Standard Terms and any declaration or authority furnished under them may be accepted electronically. Acceptance authenticated by a one-time password sent to the Client’s recorded e-mail address, together with the date, time and IP address of acceptance, constitutes a valid contract formed by electronic records under Section 10A of the Information Technology Act, 2000, and the electronic record so generated shall be admissible as evidence of its contents.')
    + H('Term, suspension and termination')
    + C(1, 'A continuing engagement remains in force until terminated by either party on thirty days’ written notice. A single assignment ends on its completion. CGA may terminate forthwith if continuing would, in its reasonable opinion, breach any law or professional obligation, or if the Client fails to furnish information or pay fees after written reminder.')
    + C(2, 'On termination the Client shall pay for all work done and expenses incurred up to the date of termination. On receipt of all dues, CGA shall return the Client’s records and DSCs against written acknowledgement and issue a letter of disengagement and no-objection.')
    + C(3, 'From the effective date of termination CGA shall have no responsibility for any return, filing, due date, notice or compliance of the Client, whether or not then pending.')
    + H('Force majeure')
    + C(1, 'Neither party shall be liable for failure or delay caused by events beyond its reasonable control, including the non-availability or malfunction of any government portal, change of statutory forms or utilities, epidemic, natural calamity, civil disturbance or governmental action.')
    + H('Governing law and dispute resolution')
    + C(1, 'The engagement is governed by the laws of India. The parties shall first attempt in good faith to resolve any dispute by discussion.')
    + C(2, 'Any dispute not so resolved within thirty days shall be referred to a sole arbitrator appointed by mutual consent of the parties, failing which in accordance with the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be New Delhi and the proceedings shall be conducted in English or Hindi. Subject to the foregoing, the courts at Delhi shall have exclusive jurisdiction.')
    + H('General')
    + C(1, 'The engagement letter, these Standard Terms and the declarations and authorities furnished under them constitute the entire agreement between the parties for the Services and supersede all prior discussions. No variation is binding unless confirmed in writing, which may be by e-mail.')
    + C(2, 'If any provision is held invalid or unenforceable, the remaining provisions shall continue in full force. No delay or omission in exercising any right shall operate as a waiver of it.')
    + C(3, 'The Client may not assign its rights under the engagement without the prior written consent of CGA. CGA may engage associated professionals and personnel to perform any part of the Services, remaining responsible to the Client for their work.');
}
// ---------------- CGA compliance engine ----------------
// p: client profile (amounts in Rs lakh). Returns applicable compliances, audits, certifications and a 12-month calendar.
var CGA_REPS = [
  { name: 'Neeraj Jain', qual: 'Founder & CEO, Canjain Global Advisors Pvt Ltd (CGA)' },
  { name: 'CA Nikhil Tanwar', qual: 'Associated Chartered Accountant, Direct Tax, CGA' },
  { name: 'CA Bhagesh Jain', qual: 'Associated Chartered Accountant, Audit & Assurance, CGA' }
];
function cgaKind(c) { c = String(c || '').toLowerCase(); return /llp/.test(c) ? 'llp' : /section 8/.test(c) ? 'sec8' : /one person|opc/.test(c) ? 'opc' : /public/.test(c) ? 'pubco' : /company|pvt|private/.test(c) ? 'co' : /partner/.test(c) ? 'firm' : /trust/.test(c) ? 'trust' : /society/.test(c) ? 'soc' : /huf/.test(c) ? 'huf' : /propriet/.test(c) ? 'prop' : 'ind'; }
function cgaCompliance(p, todayIso) {
  p = p || {};
  var n = function (v) { var x = Number(String(v == null ? '' : v).replace(/[^0-9.]/g, '')); return isFinite(x) ? x : 0; };
  var K = cgaKind(p.cons);
  var isCo = ['co', 'opc', 'pubco', 'sec8'].indexOf(K) > -1;
  var to = n(p.to), puc = n(p.puc), res = n(p.res), borr = n(p.borr), contrib = n(p.contrib), emp = n(p.emp);
  var biz = p.biz || (K === 'ind' || K === 'huf' ? 'none' : 'trading');
  var hasBiz = biz !== 'none';
  var prof = biz === 'profession';
  var gst = p.gst || 'none';
  var items = [], notes = [];
  function add(k, area, name, freq, when, basis, req) { items.push({ k: k, area: area, name: name, freq: freq, when: when, basis: basis, req: req || 'mandatory' }); }
  function rs(l) { return l >= 100 ? 'Rs ' + (Math.round(l) / 100) + ' crore' : 'Rs ' + l + ' lakh'; }
  var y24 = !/maharashtra|gujarat|karnataka|goa|kerala|tamil|telangana|andhra|chhattisgarh|madhya|daman|puducherry|andaman|lakshadweep/i.test(p.state || '');

  // ---- GST ----
  if (gst === 'regular') {
    add('gstr1', 'GST', 'GSTR-1 (outward supplies)', 'Monthly', '11th of following month', 'Regular GST registration');
    add('gstr3b', 'GST', 'GSTR-3B (summary return and tax payment)', 'Monthly', '20th of following month', 'Regular GST registration');
    add('itcrec', 'GST', 'ITC reconciliation of purchase register with GSTR-2B / IMS and GSTR-2A', 'Monthly', 'Before GSTR-3B', 'Rule 36(4) and section 16(2)(aa), CGST Act - ITC only as reflected in GSTR-2B');
  } else if (gst === 'qrmp') {
    add('gstr1', 'GST', 'GSTR-1 (quarterly) with optional IFF in first two months', 'Quarterly', '13th of month after quarter', 'QRMP scheme (aggregate turnover up to Rs 5 crore)');
    add('pmt06', 'GST', 'Monthly tax payment in PMT-06 (first two months of quarter)', 'Monthly', '25th of following month', 'QRMP scheme');
    add('gstr3b', 'GST', 'GSTR-3B (quarterly)', 'Quarterly', (y24 ? '24th' : '22nd') + ' of month after quarter', 'QRMP scheme; date depends on State of registration');
    add('itcrec', 'GST', 'ITC reconciliation with GSTR-2B / IMS and GSTR-2A', 'Quarterly', 'Before GSTR-3B', 'Section 16(2)(aa), CGST Act');
  } else if (gst === 'composition') {
    add('cmp08', 'GST', 'CMP-08 (statement-cum-challan)', 'Quarterly', '18th of month after quarter', 'Composition scheme');
    add('gstr4', 'GST', 'GSTR-4 (annual return)', 'Yearly', '30 April', 'Composition scheme');
  }
  if (gst === 'regular' || gst === 'qrmp') {
    if (to > 200) { add('gstr9', 'GST', 'GSTR-9 (annual return)', 'Yearly', '31 December', 'Aggregate turnover ' + rs(to) + ' exceeds Rs 2 crore'); }
    else { add('gstr9', 'GST', 'GSTR-9 (annual return)', 'Yearly', '31 December', 'Optional: aggregate turnover up to Rs 2 crore is exempt', 'optional'); }
    if (to > 500) { add('gstr9c', 'GST', 'GSTR-9C (reconciliation statement)', 'Yearly', '31 December', 'Aggregate turnover ' + rs(to) + ' exceeds Rs 5 crore'); }
    if (to > 500) { add('einv', 'GST', 'E-invoicing on IRP for B2B supplies', 'Continuous', 'At the time of invoice', 'Aggregate turnover exceeds Rs 5 crore' + (to >= 1000 ? '; invoices to be reported within 30 days' : '')); }
    if (p.refund) { add('gstref', 'GST', 'GST refund applications (exports / inverted duty)', 'As required', 'Within 2 years of relevant date', 'Exports or inverted duty structure', 'conditional'); }
  }

  // ---- Income tax ----
  var taxAudit = false, taBasis = '';
  if (hasBiz) {
    if (prof) { if (to > 50) { taxAudit = true; taBasis = 'Gross receipts from profession ' + rs(to) + ' exceed Rs 50 lakh'; } }
    else if (p.cash5) { if (to > 1000) { taxAudit = true; taBasis = 'Turnover ' + rs(to) + ' exceeds Rs 10 crore (cash receipts and payments within 5%)'; } }
    else if (to > 100) { taxAudit = true; taBasis = 'Turnover ' + rs(to) + ' exceeds Rs 1 crore'; }
    if (p.presum && !p.lowp && (prof ? to <= (p.cash5 ? 75 : 50) : to <= (p.cash5 ? 300 : 200))) { taxAudit = false; notes.push('Presumptive taxation opted within its limit and income declared at or above the presumptive rate: tax audit not required.'); }
    if (!taxAudit && p.presum && p.lowp) { taxAudit = true; taBasis = 'Income declared below the presumptive rate'; }
  }
  if (taxAudit) { add('taxaudit', 'Income Tax', 'Tax audit and audit report under section 63, Income-tax Act, 2025', 'Yearly', '30 September', taBasis); }
  var itrWhen = (isCo || K === 'trust' || K === 'soc' || taxAudit || (K === 'llp' && (to > 40 || contrib > 25)) || (K === 'firm' && taxAudit)) ? '31 October' : (hasBiz || K === 'firm' || K === 'llp' ? '31 August' : '31 July');
  add('itr', 'Income Tax', 'Income-tax return', 'Yearly', itrWhen, isCo ? 'Company' : (taxAudit ? 'Assessee liable to audit' : (hasBiz ? 'Business / profession income' : 'Individual / HUF')));
  if (hasBiz || isCo || K === 'firm' || K === 'llp' || p.advtax) { add('advtax', 'Income Tax', 'Advance tax (estimate and payment)', 'Quarterly', '15 June, 15 Sept, 15 Dec, 15 March', 'Where tax liability for the year is Rs 10,000 or more', 'conditional'); }
  if (p.tds) {
    add('tdspay', 'TDS / TCS', 'Deposit of TDS / TCS deducted', 'Monthly', '7th of following month (30 April for March)', 'Deductor holding TAN');
    add('tdsret', 'TDS / TCS', 'Quarterly TDS / TCS statements (salary and non-salary)', 'Quarterly', '31 July, 31 Oct, 31 Jan, 31 May', 'Deductor holding TAN');
    add('tdscert', 'TDS / TCS', 'TDS certificates to deductees', 'Quarterly / Yearly', 'Within 15 days of statement due date; salary certificate by 15 June', 'Deductor holding TAN');
  }

  // ---- Audits under other laws ----
  if (isCo) {
    add('statutory', 'Audit', 'Statutory audit of financial statements (sections 139 and 143, Companies Act, 2013)', 'Yearly', 'Before AGM (by 30 September)', 'Every company', 'mandatory');
    var small = (K === 'co' || K === 'opc') && !p.hs && puc <= 1000 && to <= 10000;
    var caroExempt = K === 'opc' || K === 'sec8' || small || (K === 'co' && !p.hs && (puc + res) <= 100 && borr <= 100 && to <= 1000);
    if (caroExempt) { notes.push('CARO 2020 not applicable: ' + (K === 'opc' ? 'One Person Company' : K === 'sec8' ? 'Section 8 company' : small ? 'small company (paid-up capital up to Rs 10 crore and turnover up to Rs 100 crore, w.e.f. 1 December 2025)' : 'private company with paid-up capital and reserves, borrowings each up to Rs 1 crore and revenue up to Rs 10 crore') + '.'); }
    else { add('caro', 'Audit', 'Reporting under Companies (Auditor’s Report) Order, 2020 (CARO)', 'Yearly', 'With statutory audit report', 'Company not covered by any CARO exemption'); }
    var intA = (K === 'co' && (to >= 20000 || borr >= 10000)) || (K === 'pubco' && (p.listed || puc >= 5000 || to >= 20000 || borr >= 10000));
    if (intA) { add('internal', 'Audit', 'Internal audit (section 138, Companies Act, 2013)', 'Yearly', 'Periodic, as per board plan', 'Turnover / borrowing / paid-up capital thresholds crossed'); }
    var secA = p.listed || (K === 'pubco' && (puc >= 5000 || to >= 25000)) || borr >= 10000;
    if (secA) { add('secaudit', 'Audit', 'Secretarial audit (section 204, Companies Act, 2013)', 'Yearly', 'With Board report', 'Listed / public company thresholds or borrowings of Rs 100 crore or more'); }
    if (biz === 'manufacturing' && to >= 3500) { add('cost', 'Audit', 'Cost records and examination of cost audit applicability (section 148)', 'Yearly', 'Within 180 days of year end', 'Manufacturing company with turnover ' + rs(to) + ' (records from Rs 35 crore; audit at higher thresholds for specified products)', 'conditional'); }
    add('agm', 'ROC / MCA', 'Board meetings, AGM and statutory registers', K === 'opc' || small ? 'Half-yearly' : 'Quarterly', 'AGM by 30 September', K === 'opc' ? 'One Person Company' : 'Companies Act, 2013');
    add('aoc4', 'ROC / MCA', 'AOC-4 (financial statements)', 'Yearly', 'Within 30 days of AGM', 'Every company');
    add('mgt7', 'ROC / MCA', (small || K === 'opc' ? 'MGT-7A' : 'MGT-7') + ' (annual return)', 'Yearly', 'Within 60 days of AGM', 'Every company');
    add('adt1', 'ROC / MCA', 'ADT-1 (auditor appointment)', 'On appointment', 'Within 15 days of AGM', 'Appointment / reappointment of auditor', 'conditional');
    if (borr > 0 || p.dep) { add('dpt3', 'ROC / MCA', 'DPT-3 (return of deposits / outstanding receipts of money)', 'Yearly', '30 June', 'Company has loans / receipts not treated as deposits'); }
    if (p.msme) { add('msme1', 'ROC / MCA', 'MSME-1 (dues to micro and small enterprises beyond 45 days)', 'Half-yearly', '30 April and 31 October', 'Purchases from MSME suppliers'); }
    add('dirkyc', 'ROC / MCA', 'DIR-3 KYC of directors', 'Every three years', '30 June of the year following the third financial year', 'Triennial KYC regime w.e.f. 31 March 2026', 'conditional');
  }
  if (K === 'llp') {
    if (to > 40 || contrib > 25) { add('llpaudit', 'Audit', 'Audit of LLP accounts (rule 24, LLP Rules, 2009)', 'Yearly', 'Before Form 8', 'Turnover above Rs 40 lakh or contribution above Rs 25 lakh'); }
    add('form11', 'ROC / MCA', 'Form 11 (annual return of LLP)', 'Yearly', '30 May', 'Every LLP');
    add('form8', 'ROC / MCA', 'Form 8 (statement of account and solvency)', 'Yearly', '30 October', 'Every LLP');
  }
  if (K === 'trust' || K === 'soc') {
    add('npoaudit', 'Audit', 'Audit of accounts of registered trust / institution under the Income-tax Act, 2025', 'Yearly', 'One month before return due date', 'Registered non-profit whose total income before exemption exceeds the basic exemption limit', p.npo ? 'mandatory' : 'conditional');
    add('npoform', 'Income Tax', 'Statement of accumulation / application of income and other non-profit filings', 'Yearly', 'Before return due date', 'Registered non-profit organisation', 'conditional');
  }

  // ---- Labour ----
  if (p.pf) { add('pf', 'Payroll', 'EPF contribution and ECR return', 'Monthly', '15th of following month', 'EPF registration'); }
  if (p.esi) { add('esi', 'Payroll', 'ESI contribution and return', 'Monthly', '15th of following month', 'ESIC registration'); }
  if (!p.pf && emp >= 20) { notes.push('With ' + emp + ' employees, EPF registration is mandatory (20 or more employees).'); }
  if (!p.esi && emp >= 10) { notes.push('With ' + emp + ' employees, ESIC registration is to be examined (10 or more employees in notified areas).'); }

  // ---- Bookkeeping ----
  if (hasBiz || isCo || K === 'firm' || K === 'llp' || K === 'trust' || K === 'soc') { add('books', 'Accounts', 'Bookkeeping, bank reconciliation and monthly MIS', 'Monthly', 'Within 10 days after month end', 'Maintenance of books of account', 'optional'); }

  // ---- Certifications (on request) ----
  var cert = [];
  if (p.forex) { cert.push(['15cb', 'Chartered accountant certificate for foreign remittances', 'Payments to non-residents']); }
  if (p.refund) { cert.push(['refcert', 'Chartered accountant certificate for GST refund (unjust enrichment)', 'Refund claims above Rs 2 lakh']); }
  cert.push(['nw', 'Net worth / turnover certificates (bank, tender, visa)', 'As required by bank, tender or embassy']);
  if (isCo) { cert.push(['dptcert', 'Auditor certificate for DPT-3 / other MCA forms', 'Where prescribed']); }
  cert.forEach(function (c) { add(c[0], 'Certification', c[1], 'On request', 'As required', c[2], 'on request'); });

  // ---- 12-month calendar ----
  var today = new Date(todayIso || Date.now());
  var start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
  var cal = [];
  function push(y, m, d, k, label) { var dt = new Date(Date.UTC(y, m, d)); if (dt >= new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())) && dt < new Date(start.getTime() + 366 * 86400000)) { cal.push({ d: dt.toISOString().slice(0, 10), k: k, t: label }); } }
  var has = function (k) { return items.some(function (i) { return i.k === k; }); };
  var MN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  for (var i = 0; i < 13; i++) {
    var y = start.getUTCFullYear() + Math.floor((start.getUTCMonth() + i) / 12), m = (start.getUTCMonth() + i) % 12;
    var pm = (m + 11) % 12, pmy = m === 0 ? y - 1 : y, per = MN[pm] + ' ' + pmy;
    var qEnd = [3, 6, 9, 0].indexOf(m) > -1; // month after quarter end (Apr, Jul, Oct, Jan)
    if (gst === 'regular') { push(y, m, 11, 'gstr1', 'GSTR-1 for ' + per); push(y, m, 18, 'itcrec', 'ITC reconciliation (2B/IMS) for ' + per); push(y, m, 20, 'gstr3b', 'GSTR-3B for ' + per); }
    if (gst === 'qrmp') { if (qEnd) { push(y, m, 13, 'gstr1', 'GSTR-1 for quarter ending ' + per); push(y, m, 18, 'itcrec', 'ITC reconciliation for quarter ending ' + per); push(y, m, y24 ? 24 : 22, 'gstr3b', 'GSTR-3B for quarter ending ' + per); } else { push(y, m, 25, 'pmt06', 'PMT-06 tax payment for ' + per); } }
    if (gst === 'composition' && qEnd) { push(y, m, 18, 'cmp08', 'CMP-08 for quarter ending ' + per); }
    if (p.tds) { push(y, m, m === 3 ? 30 : 7, 'tdspay', 'TDS deposit for ' + per); }
    if (p.pf) { push(y, m, 15, 'pf', 'EPF / ECR for ' + per); }
    if (p.esi) { push(y, m, 15, 'esi', 'ESI for ' + per); }
    if (has('books')) { push(y, m, 10, 'books', 'Books and MIS for ' + per); }
  }
  var Y = start.getUTCFullYear();
  [Y, Y + 1].forEach(function (yy) {
    if (p.tds) { push(yy, 6, 31, 'tdsret', 'TDS statement Q1'); push(yy, 9, 31, 'tdsret', 'TDS statement Q2'); push(yy, 0, 31, 'tdsret', 'TDS statement Q3'); push(yy, 4, 31, 'tdsret', 'TDS statement Q4'); push(yy, 5, 15, 'tdscert', 'Salary TDS certificates'); }
    if (has('advtax')) { push(yy, 5, 15, 'advtax', 'Advance tax - 1st instalment'); push(yy, 8, 15, 'advtax', 'Advance tax - 2nd instalment'); push(yy, 11, 15, 'advtax', 'Advance tax - 3rd instalment'); push(yy, 2, 15, 'advtax', 'Advance tax - final instalment'); }
    var itrM = itrWhen === '31 July' ? [6, 31] : itrWhen === '31 August' ? [7, 31] : [9, 31];
    push(yy, itrM[0], itrM[1], 'itr', 'Income-tax return');
    if (taxAudit) { push(yy, 8, 30, 'taxaudit', 'Tax audit report'); }
    if (has('gstr9')) { push(yy, 11, 31, 'gstr9', 'GSTR-9' + (has('gstr9c') ? ' and GSTR-9C' : '') + ' annual return'); }
    if (gst === 'composition') { push(yy, 3, 30, 'gstr4', 'GSTR-4 annual return'); }
    if (isCo) { push(yy, 8, 30, 'agm', 'AGM (with audited accounts)'); push(yy, 9, 14, 'adt1', 'ADT-1 (if auditor appointed)'); push(yy, 9, 30, 'aoc4', 'AOC-4 filing'); push(yy, 10, 29, 'mgt7', 'Annual return (MGT-7 / MGT-7A) filing'); if (has('dpt3')) { push(yy, 5, 30, 'dpt3', 'DPT-3'); } if (has('msme1')) { push(yy, 3, 30, 'msme1', 'MSME-1 (Oct-Mar)'); push(yy, 9, 31, 'msme1', 'MSME-1 (Apr-Sep)'); } }
    if (K === 'llp') { push(yy, 4, 30, 'form11', 'LLP Form 11'); push(yy, 9, 30, 'form8', 'LLP Form 8'); }
    if (has('npoaudit')) { push(yy, 8, 30, 'npoaudit', 'Trust / institution audit report'); }
  });
  cal.sort(function (a, b) { return a.d < b.d ? -1 : a.d > b.d ? 1 : 0; });
  return { kind: K, items: items, notes: notes, calendar: cal, tax_audit: taxAudit };
}

function cgaComplianceTable(c, sel, e) {
  sel = sel || {};
  var rows = c.items.map(function (i) {
    var by = sel[i.k] === 'client' ? 'Client' : (sel[i.k] === 'cga' ? 'CGA' : (i.req === 'on request' ? 'CGA, on request' : 'Client'));
    return '<tr><td>' + e(i.area) + '</td><td>' + e(i.name) + (i.req === 'optional' ? ' <i>(optional)</i>' : i.req === 'conditional' ? ' <i>(if applicable)</i>' : '') + '</td><td>' + e(i.freq) + '</td><td>' + e(i.when) + '</td><td>' + e(i.basis) + '</td><td><b>' + by + '</b></td></tr>';
  }).join('');
  return '<table class="t"><tr><th>Area</th><th>Compliance</th><th>Frequency</th><th>Due</th><th>Basis of applicability</th><th>Responsibility</th></tr>' + rows + '</table>'
    + (c.notes.length ? '<p><b>Notes:</b> ' + c.notes.map(e).join(' ') + '</p>' : '');
}

function renderKit(k, fd, acc) {
  fd = fd || {};
  function e(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function b(v, w) { v = String(v == null ? '' : v).trim(); return v ? '<b>' + e(v) + '</b>' : '<span class="bl">' + '&nbsp;'.repeat(w || 18) + '</span>'; }
  function arr(x) { return Array.isArray(x) ? x : []; }
  function js(s, d) { try { var v = JSON.parse(s || ''); return v == null ? d : v; } catch (z) { return d; } }
  function istTxt(iso) { var d = new Date(new Date(iso).getTime() + 330 * 60000); return d.toISOString().slice(0, 16).replace('T', ' ') + ' IST'; }
  function dTxt(iso) { var M = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; var d = new Date(new Date(iso || Date.now()).getTime() + 330 * 60000); return d.getUTCDate() + ' ' + M[d.getUTCMonth()] + ' ' + d.getUTCFullYear(); }
  function cell(v) { v = String(v == null ? '' : v).trim(); return v ? e(v) : '&nbsp;'; }
  function table(head, rows) {
    return '<table class="t"><tr>' + head.map(function (h) { return '<th>' + e(h) + '</th>'; }).join('') + '</tr>'
      + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>';
  }
  var name = k.name || '';
  var cons = fd.constitution || k.entity_type || '';
  var lc = String(cons).toLowerCase();
  var T = /llp/.test(lc) ? 'llp' : /company|pvt|private|public|section 8/.test(lc) ? 'co' : /partner/.test(lc) ? 'firm' : /trust/.test(lc) ? 'trust' : /society/.test(lc) ? 'soc' : /huf/.test(lc) ? 'huf' : /propriet/.test(lc) ? 'prop' : 'ind';
  var WHO = { co: 'Directors', llp: 'Designated Partners', firm: 'Partners', trust: 'Trustees', soc: 'Members of the Governing Body', huf: 'Karta and adult coparceners', prop: 'Proprietor', ind: 'Individual' }[T];
  var BODY = { co: 'Board of Directors', llp: 'Designated Partners', trust: 'Board of Trustees', soc: 'Governing Body' }[T] || '';
  var isInd = T === 'ind';
  var fy = k.fy || '2026-27';
  var services = js(k.services, []);
  var conflict = js(k.conflict, []);
  var owners = arr(fd.owners).slice(0, 20);
  var auth = arr(fd.auth).slice(0, 10);
  var reg = fd.reg || {};
  var logins = fd.logins || {};
  var PORT = [['GST', 'GST Portal'], ['IT', 'Income Tax e-Filing Portal'], ['TDS', 'TRACES (TDS)'], ['MCA', 'MCA Portal'], ['EPF', 'EPFO / ESIC']];
  var dated = acc ? dTxt(acc.at) : '';
  var place = acc ? (acc.place || '') : (fd.place || '');
  var ref = 'CGA/' + e(k.kit_id) + '/' + e(fy);
  var refLine = '<table class="m"><tr><td>Ref.: <b>' + ref + '</b></td><td style="text-align:right">Date: ' + b(dated, 14) + '</td></tr></table>';
  var prof = (fd.p && typeof fd.p === 'object') ? fd.p : null;
  var cmp = prof ? cgaCompliance(Object.assign({}, prof, { cons: cons }), acc ? acc.at : null) : null;
  var hasBiz = !prof || prof.biz !== 'none' || !isInd;

  function clientHead() {
    return '<div class="clh"><b>' + e(String(name).toUpperCase() || 'CLIENT') + '</b><span>' + e(k.address || '') + (k.pan ? ' &middot; PAN ' + e(k.pan) : '') + (k.gstin ? ' &middot; GSTIN ' + e(k.gstin) : '') + '</span>'
      + '<span class="nt">(To be reproduced on the letterhead of the Client where a printed copy is executed)</span></div>';
  }
  function toCGA() { return '<p>To<br>' + CGA.name + '<br>' + CGA.regd + '</p>'; }
  function sigBlock(forWhom, label) {
    if (!acc) { return '<div class="pend">Signature: pending. This document will be executed by e-mail OTP authentication on the CGA portal.</div>'; }
    return '<div class="sig">' + (label ? '<div>' + label + '</div>' : '<div>For <b>' + e(forWhom || name) + '</b></div>')
      + '<div class="sg">' + e(acc.name) + '</div>'
      + '<div class="ln"><b>' + e(acc.name) + '</b><br>' + e(acc.desig || 'Authorised Signatory') + '</div>'
      + '<div>Place: ' + e(place || '-') + ' &nbsp; Date: ' + e(dated) + '</div>'
      + '<div class="au">Executed electronically. Authenticated by one-time password sent to ' + e(acc.email || k.email) + ' on ' + e(istTxt(acc.at)) + ' from IP address ' + e(acc.ip) + '. Ref. ' + ref + '. Electronic record under Sections 4, 5 and 10A of the Information Technology Act, 2000.</div></div>';
  }
  function cgaSign() {
    return '<div class="sig">For <b>' + CGA.name + '</b><div class="sg">Neeraj Jain</div><div class="ln"><b>Neeraj Jain</b><br>Director</div></div>';
  }
  function cl(no, t) { return '<p class="cl"><b>' + no + '</b>' + t + '</p>'; }

  // ---------------- Engagement Letter (continuing engagement) ----------------
  var d1 = '';
  if (!k.eng_ref) {
    var svcRows = services.filter(function (s) { return s && s.s; }).map(function (s) { return [cell(s.s), cell(s.period || 'FY ' + fy), cell(s.fee ? 'Rs ' + Number(s.fee).toLocaleString('en-IN') : (s.fee_text || 'As per invoice')), cell(s.billing || '')]; });
    if (!svcRows.length) { svcRows = [['Services presently rendered by CGA to the Client', 'FY ' + e(fy) + ' onwards', 'As per invoices raised from time to time', 'As invoiced']]; }
    d1 = '<section class="doc">' + cgaLetterhead(e) + refLine
      + '<p>To<br>' + b(name, 30) + (cons ? '<br>(' + e(cons) + ')' : '') + '<br>' + b(k.address, 40) + (k.pan ? '<br>PAN: ' + e(k.pan) : '') + (k.gstin ? ' &nbsp; GSTIN: ' + e(k.gstin) : '') + (k.cin ? ' &nbsp; CIN / Regn.: ' + e(k.cin) : '') + '</p>'
      + '<p><b>Sub.: Terms of our continuing engagement as your tax, compliance and advisory consultants from financial year ' + e(fy) + '</b></p>'
      + '<p>Dear Sir / Madam,</p>'
      + '<p>We thank you for the confidence you have reposed in us. With a view to placing our long-standing professional relationship on a clear and documented footing, and in keeping with the practice followed by well-run professional firms, we set out below the terms on which Canjain Global Advisors Private Limited (&ldquo;CGA&rdquo;) shall continue to act for you. These terms apply equally to the work we are presently handling for you and to every assignment you may entrust to us hereafter.</p>'
      + '<h2>1. Services</h2><p>We shall render the services set out below. Any other work shall be a separate assignment, to be undertaken only on your written request and on fees agreed in writing.</p>'
      + table(['Service', 'Period', 'Professional fee (excluding GST)', 'Billing'], svcRows)
      + '<h2>2. Information and approvals</h2><p>The services depend upon your furnishing complete and correct information, records and approvals in time. Every return and form will be filed only after its approval by you or by a person authorised by you in the Declaration of Authorised Persons accompanying this letter.</p>'
      + '<h2>3. Accompanying documents</h2><p>To protect both you and us, this letter is accompanied by (a) a Schedule of Applicable Compliances recording which compliances CGA shall carry out; (b) a Declaration of Constitution and Authorised Persons; (c) a Letter of Authority for Representation before tax and regulatory authorities; (d) a Letter of Authority for access to statutory portals; and (e) a Letter of Representation. Where a Digital Signature Certificate is to be kept with us, its holder will additionally execute a Deed of Authorisation and Indemnity on stamp paper.</p>'
      + '<h2>4. Standard Terms</h2><p>Our Standard Terms of Engagement, annexed hereto, form an integral part of this letter. We request you to read them carefully, in particular the clauses dealing with authority to instruct (clause 4), digital signatures and credentials (clause 5), fees (clause 6), lien (clause 7), limitation of liability (clause 8) and indemnity (clause 9).</p>'
      + '<p>Kindly signify your acceptance of this letter and the annexed Standard Terms by executing the acceptance below. Should you wish to discuss any of these terms, we shall be glad to do so.</p>'
      + '<p>Yours faithfully,</p>' + cgaSign()
      + '<h2>Acceptance by the Client</h2><p>I/We have read and understood this letter and the annexed Standard Terms of Engagement (the contents having been explained to me/us in Hindi where so required) and accept them for and on behalf of ' + b(name, 24) + '.</p>'
      + sigBlock(name) + '</section>'
      + '<section class="doc">' + cgaLetterhead(e) + cgaStandardTerms({ e: e }) + '<p class="nt" style="margin-top:12px">Annexure to letter Ref. ' + ref + '</p>' + sigBlock(name) + '</section>';
  }

  // ---------------- Schedule of compliances ----------------
  var dSch = '';
  if (cmp) {
    var P = prof, Lk = function (v) { return v === true ? 'Yes' : v === false ? 'No' : (v || '-'); };
    var GSTL = { none: 'Not registered', regular: 'Regular (monthly returns)', qrmp: 'Regular - QRMP (quarterly returns)', composition: 'Composition scheme' };
    var BZ = { none: 'No business / profession', trading: 'Trading', manufacturing: 'Manufacturing', services: 'Services', profession: 'Profession' };
    var pr = [['Constitution', e(cons || '-')], ['State of principal place of business', e(P.state || '-')], ['Nature of activity', e(BZ[P.biz] || '-')], ['GST registration', e(GSTL[P.gst] || '-')], ['Turnover / gross receipts of preceding year', P.to ? 'Rs ' + e(P.to) + ' lakh' : '-'], ['Cash receipts and payments within 5% of totals', Lk(P.cash5)], ['TDS deductor (holds TAN)', Lk(P.tds)], ['Employees / EPF / ESIC', e(P.emp || '0') + ' / ' + Lk(P.pf) + ' / ' + Lk(P.esi)], ['Foreign transactions / GST refunds', Lk(P.forex) + ' / ' + Lk(P.refund)]];
    if (cmp.kind === 'co' || cmp.kind === 'opc' || cmp.kind === 'pubco' || cmp.kind === 'sec8') { pr.push(['Paid-up capital / reserves / maximum borrowings', 'Rs ' + e(P.puc || 0) + ' / ' + e(P.res || 0) + ' / ' + e(P.borr || 0) + ' lakh']); pr.push(['Holding or subsidiary company / listed', Lk(P.hs) + ' / ' + Lk(P.listed)]); }
    if (cmp.kind === 'llp') { pr.push(['Contribution of partners', 'Rs ' + e(P.contrib || 0) + ' lakh']); }
    dSch = '<section class="doc">' + cgaLetterhead(e) + refLine
      + '<h1>Schedule of Applicable Compliances</h1><div class="st">and allocation of responsibility between the Client and CGA &middot; forming part of the engagement</div>'
      + '<h2>A. Profile furnished by the Client</h2>' + table(['Particular', 'As furnished'], pr)
      + '<h2>B. Compliances applicable on the above profile</h2>' + cgaComplianceTable(cmp, fd.sel || {}, e)
      + '<h2>C. Terms of allocation</h2>'
      + cl('1.', 'CGA shall carry out the compliances marked &ldquo;CGA&rdquo; above, subject to the Client furnishing complete information and approvals in time and to the fees agreed for them.')
      + cl('2.', 'Every compliance marked &ldquo;Client&rdquo; remains the sole responsibility of the Client. CGA shall have no obligation or liability in respect of it, whether or not CGA has knowledge of it, unless CGA has accepted it in writing.')
      + cl('3.', 'Applicability has been determined on the profile furnished by the Client and the law in force on the date of this Schedule. The Client shall inform CGA forthwith of any change in turnover, capital, borrowings, employees, registrations or activities. CGA shall review this Schedule at least once every financial year.')
      + cl('4.', 'Any audit, certificate or report which the law requires to be issued by a practising professional in his or her own name shall be undertaken by an independent practising professional in accordance with clauses 1.3 and 11.2 of the Standard Terms, CGA acting as co-ordinator.')
      + cl('5.', 'Due dates stated are those prescribed on the date of this Schedule and shall stand modified by any extension or amendment notified by the Government.')
      + sigBlock(name) + '</section>';
  }

  // ---------------- Letter of Authority for Representation ----------------
  var reps = (typeof CGA_REPS !== 'undefined' ? CGA_REPS : []);
  var dAR = '<section class="doc">' + clientHead() + refLine + '<p>To<br>' + CGA.name + '<br>and the professionals named below</p>'
    + '<h1>Letter of Authority for Representation</h1><div class="st">General authority to appear and act before tax, regulatory and appellate authorities</div>'
    + cl('1.', (isInd ? 'I' : 'We') + ', ' + b(name, 26) + (k.pan ? ' (PAN ' + e(k.pan) + ')' : '') + (k.gstin ? ' (GSTIN ' + e(k.gstin) + ')' : '') + ', hereby appoint and authorise each of the following professionals associated with Canjain Global Advisors Private Limited (&ldquo;CGA&rdquo;), severally, to act as ' + (isInd ? 'my' : 'our') + ' authorised representative:'
      + table(['Name', 'Designation'], reps.map(function (r) { return [e(r.name), e(r.qual)]; }))
      + 'together with any other advocate, chartered accountant, company secretary or cost accountant associated with CGA whom CGA may designate by written intimation to ' + (isInd ? 'me' : 'us') + ', each being a person entitled to so act under the law concerned.')
    + cl('2.', 'The authority extends to appearing, attending, representing and acting on ' + (isInd ? 'my' : 'our') + ' behalf before every officer, authority, appellate authority and tribunal under (a) the Central Goods and Services Tax Act, 2017, the State and Union Territory GST Acts and the Integrated GST Act, 2017, including section 116 of the CGST Act and the GST Appellate Tribunal; (b) the Income-tax Act, 2025, including section 515 thereof, and the Income-tax Act, 1961 for earlier years, including faceless proceedings, the Commissioner (Appeals), the Dispute Resolution Panel and the Income Tax Appellate Tribunal; (c) the Customs Act, 1962 and the Foreign Trade (Development and Regulation) Act, 1992; (d) the Companies Act, 2013 and the Limited Liability Partnership Act, 2008, in matters before the Registrar and the Regional Director; (e) the labour and social security laws; and (f) any other law under which representation by such a professional is permitted.')
    + cl('3.', 'Within that scope the representatives may, in respect of any assessment, scrutiny, audit, inquiry, verification, notice, summons, refund, rectification, appeal, revision, stay, settlement or compounding, for any period whether past, pending or future: file replies, submissions, applications, refund claims, appeals and other documents; receive notices and orders; inspect records and obtain copies; furnish documents and explanations; and do all acts incidental thereto.')
    + cl('4.', 'No admission of liability, agreement to any addition, withdrawal of any appeal or application, settlement, or payment of tax, interest or penalty shall be made on ' + (isInd ? 'my' : 'our') + ' behalf without ' + (isInd ? 'my' : 'our') + ' prior written consent, which may be given by e-mail or WhatsApp. Refunds shall be credited only to ' + (isInd ? 'my' : 'our') + ' own bank account, and CGA shall not receive any refund on ' + (isInd ? 'my' : 'our') + ' behalf.')
    + cl('5.', 'Where the law requires personal appearance or a statement on oath, ' + (isInd ? 'I' : 'we') + ' shall appear in person. Representation before any court, High Court or the Supreme Court shall be by a separate vakalatnama executed for each matter.')
    + cl('6.', 'This authority takes effect from the date of its execution, shall remain in force until revoked by written notice, and shall continue for proceedings pending on the date of revocation until other representatives are substituted on record. ' + (isInd ? 'I' : 'We') + ' ratify all acts lawfully done under it.')
    + cl('7.', 'CGA shall be obliged to represent ' + (isInd ? 'me' : 'us') + ' in a particular matter only when that matter has been entrusted to it and the fees for it agreed in writing. ' + (isInd ? 'I' : 'We') + ' shall forward every notice, summons and order to CGA within three days of its receipt.')
    + sigBlock(name)
    + '<h2>Acceptance</h2><p>The authority is accepted. Each representative named above shall sign the acceptance on the copy filed in any proceeding in which he or she appears.</p>' + cgaSign() + '</section>';

  // ---------------- Declaration of Constitution and Authorised Persons ----------------
  var ownRows = owners.map(function (o) { return [cell(o.name), cell(o.desig), cell(o.din), cell(o.share), cell(o.mobile), cell(o.email)]; });
  if (!ownRows.length) { ownRows = [['&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;']]; }
  var authRows = auth.map(function (a) { return [cell(a.name), cell(a.desig), cell(a.mobile), cell(a.email), cell(a.authority || 'Single')]; });
  if (!authRows.length) { authRows = [['&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;']]; }
  var regRows = PORT.map(function (p) { var r = reg[p[0]] || {}; return [e(p[1]), cell(r.m), cell(r.e), cell(r.o)]; });
  var br = fd.br || {};
  var we = isInd ? 'I' : 'We';
  var d2 = '<section class="doc">' + clientHead() + refLine + toCGA()
    + '<h1>' + (isInd ? 'Declaration of Authorised Contacts' : 'Declaration of Constitution, Management and Authorised Persons') + '</h1>'
    + '<p>' + (isInd ? 'I, ' + b(name, 24) + ', do hereby declare and confirm as under:' : 'We, the undersigned, being ' + (T === 'prop' ? 'the sole Proprietor' : 'all the ' + WHO) + ' of ' + b(name, 30) + ' (hereinafter &ldquo;the Client&rdquo;), do hereby jointly and severally declare and confirm as under:') + '</p>'
    + (isInd ? '' : '<h2>1. Constitution and present management</h2>' + table(['Name', 'Designation', 'DIN / PAN', 'Shareholding / profit share (%)', 'Mobile', 'E-mail'], ownRows))
    + '<h2>' + (isInd ? '1' : '2') + '. Persons authorised to deal with CGA</h2><p>The persons named below alone are authorised to give instructions to CGA, to approve returns, forms and replies before filing, and to deliver and receive documents on behalf of ' + (isInd ? 'me' : 'the Client') + '. Instructions and approvals received from the mobile numbers and e-mail addresses stated below shall be binding on ' + (isInd ? 'me' : 'the Client') + '.</p>'
    + table(['Name', 'Designation / relationship', 'Mobile / WhatsApp', 'E-mail', 'Authority (single / joint)'], authRows)
    + '<h2>' + (isInd ? '2' : '3') + '. Contact details registered on statutory portals</h2>' + table(['Portal', 'Registered mobile', 'Registered e-mail', 'Belongs to'], regRows)
    + '<h2>' + (isInd ? '3' : '4') + '. Confirmations and undertakings</h2>'
    + cl('(a)', 'The particulars stated above are true, correct and complete.' + (isInd ? '' : ' As on the date hereof there is no dispute among the ' + WHO.toLowerCase() + ', members or shareholders of the Client regarding its management, control or affairs, and no proceeding is pending among them, save: ' + b(fd.dispute || 'None', 10) + '.'))
    + cl('(b)', we + ' shall intimate CGA in writing within three days of any change in the ' + (isInd ? 'persons authorised above or in the contact details registered on any portal' : 'constitution, management, shareholding or Authorised Persons of the Client, or of any dispute arising among us') + '.')
    + cl('(c)', 'Until such intimation is received by CGA, CGA shall be entitled to act on the instructions of the persons named above, and every act so done shall bind ' + (isInd ? 'me' : 'the Client and each of us') + '.')
    + (isInd ? '' : cl('(d)', 'In the event of any dispute among us, CGA may suspend all work and retain all records until it receives joint written instructions signed by all of us or an order of a competent court or tribunal, and CGA shall not be answerable to any of us for doing so.'))
    + cl(isInd ? '(d)' : '(e)', 'No person other than those named above is authorised to collect any document, Digital Signature Certificate, credential or information from CGA.')
    + (acc && !isInd ? '<p class="nt">The signatory below confirms that every person named in paragraph 1 has read and agreed to this Declaration.' + (owners.length > 1 ? ' A printed counterpart is also being signed by each of them.' : '') + '</p>' : '')
    + sigBlock(name);
  if (BODY) {
    d2 += '<h1 style="margin-top:22px">Certified True Copy of the Resolution</h1><div class="st">passed by the ' + BODY + ' of ' + e(name) + (T === 'co' ? ' at its meeting held on ' + b(br.date, 12) + ' at ' + b(br.time, 8) + ' at the registered office' : ' on ' + b(br.date, 12)) + '</div>'
      + '<p>&ldquo;<b>RESOLVED THAT</b> Canjain Global Advisors Private Limited be and is hereby appointed to render tax, accounting, GST, TDS, corporate compliance and allied advisory services to the ' + (T === 'llp' ? 'LLP' : T === 'trust' ? 'Trust' : T === 'soc' ? 'Society' : 'Company') + ' on the terms of the engagement letter and Standard Terms of Engagement placed before the meeting, which are hereby approved;</p>'
      + '<p><b>RESOLVED FURTHER THAT</b> ' + b(br.director, 22) + (T === 'co' ? ', Director (DIN ' + b(br.din, 10) + ')' : '') + ', be and is hereby authorised to sign and execute the engagement letter, declarations, letters of authority and indemnities in favour of Canjain Global Advisors Private Limited, to give instructions and approvals to it, and to deliver and receive documents on behalf of the ' + (T === 'llp' ? 'LLP' : 'entity') + ';</p>'
      + '<p><b>RESOLVED FURTHER THAT</b> the Digital Signature Certificates of the ' + WHO.toLowerCase() + ' may be placed in the custody of Canjain Global Advisors Private Limited for statutory filings, subject to a separate written authorisation executed by each holder personally;</p>'
      + '<p><b>RESOLVED FURTHER THAT</b> this authority shall remain in force until a resolution revoking or modifying it is delivered in writing to Canjain Global Advisors Private Limited.&rdquo;</p>'
      + '<p>Certified to be a true copy.</p>' + sigBlock(name, 'For <b>' + e(name) + '</b>');
  }
  if (!acc || owners.length > 1) {
    d2 += '<h2>Signatures of all ' + (isInd ? '' : WHO.toLowerCase()) + '</h2>' + table(['Name', 'Designation', 'Signature', 'Date'], (owners.length ? owners : [{}, {}]).map(function (o) { return [cell(o.name), cell(o.desig), '&nbsp;<br>&nbsp;', '&nbsp;']; })) + '<p>Seal of the Client: ______________ &nbsp; Place: ____________</p>';
  }
  d2 += '</section>';

  // ---------------- Letter of Authority for statutory portals ----------------
  var logRows = PORT.map(function (p) { var r = logins[p[0]] || {}; return [e(p[1]), cell(r.id), cell(r.date), cell(r.otp)]; });
  var lo = logins.OTHER || {};
  logRows.push(['Other: ' + cell(lo.portal), cell(lo.id), cell(lo.date), cell(lo.otp)]);
  var d4 = '<section class="doc">' + clientHead() + refLine + toCGA()
    + '<h1>Letter of Authority</h1><div class="st">for access to and use of statutory portals</div>'
    + '<p>Dear Sirs,</p>'
    + cl('1.', we + ', ' + b(name, 24) + ', hereby authorise Canjain Global Advisors Private Limited (&ldquo;CGA&rdquo;) and its personnel to log in to the portals listed below on ' + (isInd ? 'my' : 'our') + ' behalf, solely for rendering the services under the engagement letter:' + table(['Portal', 'User ID', 'Shared with CGA on', 'OTP received on (mobile / e-mail of)'], logRows))
    + cl('2.', 'Passwords are communicated separately and are not recorded in this letter. They have been shared by ' + (isInd ? 'me' : 'us') + ' voluntarily.')
    + cl('3.', 'The mobile number and e-mail address registered on every portal shall remain those of ' + (isInd ? 'myself' : 'the Client or its own officers') + '. CGA shall not be asked to register its own number or e-mail address, or that of any of its personnel, on any portal of ' + (isInd ? 'mine' : 'the Client') + '.')
    + cl('4.', 'Every return, form, reply or application filed through these credentials on ' + (isInd ? 'my' : 'our') + ' instruction or approval, given in writing, by e-mail or by WhatsApp, shall be deemed to have been filed by ' + (isInd ? 'me' : 'us') + ', and ' + (isInd ? 'I' : 'we') + ' shall be solely responsible for its contents.')
    + cl('5.', (isInd ? 'I am' : 'We are') + ' free to change any password at any time. If a password, registered mobile number or e-mail address is changed and the revised particulars are not communicated to CGA in writing at least seven working days before a due date, CGA shall bear no responsibility for the filing concerned or for any late fee, interest, penalty or notice that may follow.')
    + cl('6.', 'These credentials are also known to and used by the following persons other than CGA: ' + b(fd.others || 'None', 14) + '. CGA shall not be responsible for any act done on the portals by any person other than its own personnel.')
    + cl('7.', 'This authority may be withdrawn by ' + (isInd ? 'me' : 'us') + ' at any time by written notice and shall in any event cease on termination of the engagement, whereupon ' + (isInd ? 'I' : 'we') + ' shall change all passwords forthwith.')
    + cl('8.', (isInd ? 'I' : 'We') + ' shall indemnify and keep indemnified CGA, its directors and personnel against all claims and proceedings arising from filings made on ' + (isInd ? 'my' : 'our') + ' instruction or approval, or from use of these credentials by any person other than CGA’s personnel.')
    + '<p>Yours faithfully,</p>' + sigBlock(name) + '</section>';

  // ---------------- Letter of Representation ----------------
  var d5i = '';
  if (isInd && !hasBiz) {
    d5i = '<section class="doc">' + clientHead() + refLine + toCGA()
      + '<h1>Letter of Representation</h1><div class="st">regarding income, investments and information &middot; financial year ' + e(fy) + '</div>'
      + '<p>Dear Sirs,</p><p>This letter is furnished in connection with the tax services rendered by you to me for the financial year ' + e(fy) + '. I confirm, to the best of my knowledge and belief, that:</p>'
      + cl('1.', 'All my sources of income, including salary, house property, capital gains, interest, dividends and income from other sources, and all my bank accounts, investments and assets have been disclosed to you.')
      + cl('2.', 'I have examined the information in my Annual Information Statement and Form 26AS, and have explained to you every entry in them that does not relate to me or differs from my records.')
      + cl('3.', 'Particulars of any asset held or income earned outside India, and of any account outside India in which I have signing authority, have been disclosed to you.')
      + cl('4.', 'Deductions and exemptions claimed are supported by documents in my possession, which I shall produce when required.')
      + cl('5.', 'Every notice or communication received from the Income-tax Department up to the date of this letter has been handed over to you.')
      + cl('6.', 'The computation and return prepared by you will be examined and approved by me before filing. I shall bear any tax, interest, penalty or prosecution arising from information that is incorrect or incomplete, and shall not hold CGA, its directors or personnel responsible for it.')
      + '<p>Yours faithfully,</p>' + sigBlock(name) + '</section>';
  }
  var d5 = '<section class="doc">' + clientHead() + refLine + toCGA()
    + '<h1>Letter of Representation</h1><div class="st">regarding books of account, records and information &middot; financial year ' + e(fy) + '</div>'
    + '<p>Dear Sirs,</p>'
    + '<p>This letter is furnished in connection with the accounting, tax and compliance services rendered by you to ' + (isInd ? 'me' : 'us') + ' for the financial year ' + e(fy) + '. ' + (isInd ? 'I' : 'We') + ' acknowledge ' + (isInd ? 'my' : 'our') + ' responsibility for the matters stated below and confirm, to the best of ' + (isInd ? 'my' : 'our') + ' knowledge and belief, having made such enquiries as ' + (isInd ? 'I' : 'we') + ' considered necessary, that:</p>'
    + cl('1.', 'All books of account, vouchers, bills, bank statements, stock records and other documents furnished to you are genuine and complete, relate to ' + (isInd ? 'my income and affairs' : 'the business of the Client') + ', and nothing material has been withheld.')
    + cl('2.', 'All income, sales, purchases, receipts, payments, loans, cash transactions and transactions with related parties have been disclosed to you. There is no bank account, loan, investment, asset or liability other than those disclosed.')
    + cl('3.', 'Closing stock, cash in hand, debtors, creditors and loan balances have been taken as certified by ' + (isInd ? 'me' : 'us') + '. You have not physically verified them.')
    + cl('4.', 'Input tax credit has been claimed only on goods and services actually received, against tax invoices of registered suppliers, and payment has been or will be made to such suppliers through banking channels within the time permitted by law.')
    + cl('5.', 'Loans and deposits have been accepted only from the persons reflected in the books, whose identity, creditworthiness and source of funds ' + (isInd ? 'I hold' : 'we hold') + ' and shall produce when required.')
    + cl('6.', 'Every notice, summons, order and demand received from any authority up to the date of this letter has been handed over to you. Any communication not so handed over remains ' + (isInd ? 'my' : 'our') + ' sole responsibility.')
    + cl('7.', 'Every return, computation and statement prepared by you has been, or will before filing be, examined and approved by ' + (isInd ? 'me' : 'us') + '. Estimates, valuations, classifications and explanations used therein are ' + (isInd ? 'mine' : 'ours') + '; where you advised a different treatment and ' + (isInd ? 'I' : 'we') + ' chose otherwise, the decision and its consequences are ' + (isInd ? 'mine' : 'ours') + '.')
    + cl('8.', (isInd ? 'I' : 'We') + ' shall bear any tax, interest, late fee, penalty or prosecution arising from information that is incorrect or incomplete, and shall not hold CGA, its directors or personnel responsible for it.')
    + '<p>Yours faithfully,</p>' + sigBlock(name) + '</section>';

  // ---------------- Disclosure of Interest and Consent ----------------
  var d6 = '';
  if (conflict.length) {
    d6 = '<section class="doc">' + clientHead() + refLine + toCGA()
      + '<h1>Disclosure of Interest and Consent</h1>'
      + cl('1.', 'We, being all the ' + WHO.toLowerCase() + ' of ' + b(name, 24) + ' (&ldquo;the Client&rdquo;), record that the following persons connected with Canjain Global Advisors Private Limited (&ldquo;CGA&rdquo;) hold the interest stated against their names in the Client:' + table(['Name', 'Connection with CGA', 'Interest in the Client (shareholding / office / loan and its terms)'], conflict.map(function (c) { return [cell(c.name), cell(c.conn), cell(c.interest)]; })))
      + cl('2.', 'The said interest was disclosed to us before the engagement, and we have appointed CGA with full knowledge of it.')
      + cl('3.', 'The professional engagement of CGA and the rights of the above persons as shareholders, office-holders or lenders are distinct. Nothing done by CGA in the course of the engagement shall diminish or waive those rights, and the exercise of those rights shall not constitute a breach of the engagement.')
      + cl('4.', 'Records, credentials and Digital Signature Certificates held by CGA are held for the Client under the authorities executed by us. In the event of any dispute among the shareholders or office-holders, CGA shall act in accordance with clause 4 of its Standard Terms of Engagement.')
      + cl('5.', 'The statutory auditor of the Client, where required, is appointed by the Client in accordance with law and is independent of CGA. The audit report is the sole responsibility of that auditor.')
      + cl('6.', 'Every loan from the above persons or their entities to the Client is, or shall be, recorded in a separate written agreement stating the amount, rate of interest, repayment terms and security.')
      + cl('7.', 'We have no objection to CGA continuing the engagement, and shall not raise the said interest as a ground of complaint or claim against CGA hereafter.')
      + sigBlock(name) + '<h2>Signatures of all ' + WHO.toLowerCase() + '</h2>' + table(['Name', 'Signature', 'Date'], (owners.length ? owners : [{}, {}]).map(function (o) { return [cell(o.name), '&nbsp;<br>&nbsp;', '&nbsp;']; })) + '<p>Seal of the Client: ______________ &nbsp; Place: ____________</p></section>';
  }

  // ---------------- Deed of Authorisation and Indemnity (DSC) - print on stamp paper ----------------
  var holders = owners.filter(function (o) { return o.dsc; });
  js(k.dsc_holders, []).forEach(function (h) { if (h && !holders.some(function (o) { return String(o.name || '').toLowerCase() === String(h).toLowerCase(); })) { holders.push({ name: h }); } });
  function doc3(o) {
    return '<section class="doc"><p class="nt" style="text-align:center">[To be engrossed on non-judicial stamp paper of the value prescribed in the State of execution, signed by the holder personally before two witnesses and attested by a Notary Public]</p>'
      + '<h1>Deed of Authorisation and Indemnity</h1><div class="st">for custody and use of Digital Signature Certificate</div>'
      + '<p>THIS DEED is executed at ______________ on this ______ day of ______________, 20____</p>'
      + '<p><b>BY</b> ' + b(o.name, 22) + ', son / daughter / wife of ____________________, aged about ____ years, resident of ______________________________________, holding PAN ' + b(o.pan || (/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(String(o.din || '')) ? o.din : ''), 12) + ' and Aadhaar No. XXXX XXXX ________, being the ' + b(o.desig || 'Director / Partner / Proprietor / Authorised Signatory', 14) + ' of ' + b(name, 24) + ' (hereinafter called &ldquo;<b>the Executant</b>&rdquo;, which expression shall, unless repugnant to the context, include his / her heirs, executors, administrators and legal representatives),</p>'
      + '<p><b>IN FAVOUR OF</b> ' + CGA.name + ', a company incorporated under the Companies Act, 2013 (CIN ' + CGA.cin + '), having its registered office at ' + CGA.regd + ' (hereinafter called &ldquo;<b>CGA</b>&rdquo;, which expression shall, unless repugnant to the context, include its successors and permitted assigns).</p>'
      + '<p><b>WHEREAS</b></p>'
      + cl('A.', 'The Executant is the lawful subscriber of the Digital Signature Certificate particularised in the Schedule hereto (&ldquo;<b>the DSC</b>&rdquo;), issued under the Information Technology Act, 2000.')
      + cl('B.', 'CGA renders tax, compliance and advisory services to ' + b(name, 22) + ' (&ldquo;<b>the Client</b>&rdquo;) and to the Executant, and the Executant, for his / her own convenience, desires to place the DSC in the custody of CGA for the limited purpose and on the terms hereinafter appearing.')
      + '<p><b>NOW THIS DEED WITNESSETH AS FOLLOWS:</b></p>'
      + cl('1.', 'The Executant, of his / her own free will, hereby places the DSC token together with its PIN in the custody of CGA with effect from ______________.')
      + cl('2.', 'The Executant authorises CGA and its personnel to affix the DSC solely for filings of the Client and of the Executant on the GST, Income Tax, TRACES, MCA, EPFO / ESIC portals and ______________, and for no other purpose.')
      + cl('3.', 'Each use of the DSC shall be made on the instruction or approval of the Executant or of an Authorised Person named in the Client’s Declaration of Authorised Persons, given in writing, by e-mail or by WhatsApp. Every document so signed shall be deemed to have been signed by the Executant, who shall remain responsible for it under the Information Technology Act, 2000 and every other applicable law.')
      + cl('4.', 'The Executant may revoke this authority at any time by notice in writing signed by him / her. CGA shall thereupon return the DSC to the Executant personally, or to a person authorised by him / her in writing, against a signed acknowledgement, and shall not be bound to deliver it to any other person.')
      + cl('5.', 'CGA shall not exercise any lien over the DSC and shall not withhold it on account of unpaid fees or for any other reason.')
      + cl('6.', 'From the date of its return, CGA shall have no responsibility whatsoever for any use of the DSC.')
      + cl('7.', 'The Executant shall not hold CGA, its directors or personnel responsible for any filing made with the DSC on instruction or approval given under clause 3, and hereby indemnifies and agrees to keep indemnified CGA, its directors and personnel against all claims, losses, penalties, costs and proceedings, civil or criminal, arising from the custody or authorised use of the DSC, or from any dispute between the Executant and the other directors, partners, members or shareholders of the Client.')
      + cl('8.', 'This Deed shall apply equally to any renewed or replacement DSC of the Executant delivered to CGA, until revoked under clause 4.')
      + cl('9.', 'The contents of this Deed have been read over and explained to the Executant in Hindi, and he / she has executed it after understanding the same.')
      + '<h2>Schedule (particulars of the DSC)</h2>' + table(['Particular', 'Detail'], [['Name of subscriber', cell(o.name)], ['Certifying Authority', '&nbsp;'], ['Class and type', '&nbsp;'], ['Token serial number', '&nbsp;'], ['Valid up to', '&nbsp;']])
      + '<p><b>IN WITNESS WHEREOF</b> the Executant has signed this Deed on the day, month and year first above written.</p>'
      + '<div class="two"><div><b>WITNESSES</b><br><br>1. Signature ____________<br>Name & address ____________<br>Mobile ____________<br><br>2. Signature ____________<br>Name & address ____________<br>Mobile ____________</div>'
      + '<div style="text-align:right"><br><br><br>____________________<br><b>EXECUTANT</b><br>' + b(o.name, 16) + '<br>Mobile ' + b(o.mobile, 12) + '</div></div>'
      + '<h2>Acknowledgement by CGA</h2><p>Received the DSC described in the Schedule on ____________ at ________ hours.<br><br>For ' + CGA.name + '<br><br>____________________<br>Name and designation</p>'
      + '<p class="nt">Kit Ref. ' + ref + '</p></section>';
  }
  var pr = holders.map(doc3).join('');
  if (owners.length > 1) {
    pr = '<section class="doc">' + clientHead() + '<h1>Counterpart Signature Page</h1><div class="st">Declaration of Constitution, Management and Authorised Persons &middot; Ref. ' + ref + '</div><p>We, the undersigned, being all the ' + WHO.toLowerCase() + ' of ' + b(name, 24) + ', confirm the Declaration accepted electronically on ' + b(dated, 10) + ' under the above reference, and the Standard Terms of Engagement of Canjain Global Advisors Private Limited.</p>' + table(['Name', 'Designation', 'Signature', 'Date'], owners.map(function (o) { return [cell(o.name), cell(o.desig), '&nbsp;<br>&nbsp;', '&nbsp;']; })) + '<p>Seal of the Client: ______________ &nbsp; Place: ____________</p></section>' + pr;
  }
  var wrap = function (title, body) { return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + e(title) + '</title><link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400&family=Great+Vibes&display=swap" rel="stylesheet">' + LEGAL_CSS + '</head><body>' + body + '</body></html>'; };
  return {
    html: wrap('CGA Client Documents ' + k.kit_id, d1 + dSch + d2 + dAR + d4 + (d5i || d5) + d6),
    print: pr ? wrap('CGA documents for physical signature ' + k.kit_id, pr) : '',
    holders: holders.map(function (o) { return o.name; }),
    has6: !!conflict.length
  };
}

function cgaBuildEngagement(c, pageHtml) {
function e(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function strip(s) { return String(s).replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/[ ]+/g, ' ').trim(); }
function m(n) { return Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

function tierScope(code, depth) {
  var out = [];
  if (!pageHtml || !code || depth > 4) { return out; }
  var mark = '<span class="tier-code">' + code + '</span>';
  var i = pageHtml.indexOf(mark);
  if (i < 0) { return out; }
  var ulS = pageHtml.indexOf('<ul', i);
  var ulE = pageHtml.indexOf('</ul>', ulS);
  if (ulS < 0 || ulE < ulS || ulS - i > 4000) { return out; }
  var parts = pageHtml.slice(ulS, ulE).split('<li');
  for (var k = 1; k < parts.length; k++) {
    var t = strip('<li' + parts[k]);
    if (!t) { continue; }
    var words = t.split(' ');
    if (t.toLowerCase().indexOf('ka poora scope') >= 0 && words.length <= 5) {
      tierScope(words[0], depth + 1).forEach(function (x) { out.push(x); });
    } else { out.push(t); }
  }
  return out;
}
var s = (c.service + ' ' + c.page).toLowerCase();
var RULES = [
  [['admission of partner', 'admission of new partner', 'partner admission', 'new partner', 'add partner', 'reconstitution'], 'the draft deed within three working days of receipt of your instructions, and each filing within five working days of receipt of the executed deed and documents; approval by the GST department, the Registrar of Firms, banks and other authorities is outside our control', ['Drafting of a Supplementary Partnership Deed / Deed of Admission admitting the incoming partner, recording the capital contribution, profit-sharing ratio, rights, duties and the effective date of admission, on the terms instructed in writing by all existing partners', 'Guidance on stamp duty, execution and notarisation of the deed under the applicable state law', 'Intimation of the change in the constitution of the firm to the Registrar of Firms under Section 63 of the Indian Partnership Act, 1932, where the firm is registered', 'Amendment of core fields of the GST registration in Form GST REG-14 to add the incoming partner as partner and, if instructed, as authorised signatory, including Aadhaar authentication and replies to any clarification sought in Form GST REG-03, until the amendment is approved', 'Updating the partner details in the Udyam registration and in other registrations held by the firm (such as Shop and Establishment, Trade Licence, Professional Tax, FSSAI or IEC) to the extent listed by you in writing', 'Preparation of the covering letter and document set for updating partners and authorised signatories with the firm’s bankers', 'This assignment does not include any change of the firm’s name, the retirement of any partner, valuation, capital account or tax advice on the admission, or any Digital Signature Certificate, which can be arranged separately at actuals']],
  [['itr'], 'within three to five working days of receipt of complete documents and your approval of the computation of income', ['Collection and review of income particulars, Form 16, Form 26AS, AIS and TIS', 'Computation of total income and tax liability, and advice on tax payable or refund due', 'Preparation and electronic filing of the return of income for the relevant assessment year', 'Assistance with e-verification and furnishing of the filing acknowledgement']],
  [['gst-return', 'gst return'], 'on or before the statutory due date for each tax period, provided the data is received at least five days before that date', ['Preparation of GSTR-1 and GSTR-3B from the data furnished by you', 'Reconciliation of input tax credit with GSTR-2B', 'Electronic filing of the returns and furnishing of acknowledgements']],
  [['gst-registration', 'gst registration'], 'the application will be filed within two working days of receipt of complete documents; grant of registration rests with the GST authorities and ordinarily takes seven to fifteen working days', ['Scrutiny of documents for registration', 'Filing of application in Form GST REG-01', 'Response to clarifications sought by the department, if any', 'Furnishing of the certificate of registration']],
  [['tds'], 'quarterly statements will be filed on or before the statutory due date, provided deduction data is received at least seven days before that date', ['Preparation of quarterly TDS / TCS statements from the deduction data furnished', 'Electronic filing of the statements', 'Generation of Form 16 / 16A, where applicable']],
  [['pvt-ltd', 'private limited', 'opc', 'one person', 'section 8', 'section-8'], 'ordinarily ten to fifteen working days from receipt of complete documents, subject to processing by the Ministry of Corporate Affairs', ['Reservation of name and filing of incorporation forms with the Ministry of Corporate Affairs', 'Digital Signature Certificates and Director Identification Numbers, to the extent included in the package', 'Drafting of the Memorandum and Articles of Association', 'Furnishing of the certificate of incorporation, PAN and TAN']],
  [['llp'], 'ordinarily twelve to eighteen working days from receipt of complete documents, subject to processing by the Ministry of Corporate Affairs', ['Reservation of name and filing of incorporation forms', 'Drafting and filing of the LLP Agreement, to the extent included in the package', 'Furnishing of the certificate of incorporation, PAN and TAN']],
  [['roc', 'annual compliance'], 'on or before the due dates prescribed under the Companies Act, 2013 / LLP Act, 2008, provided the financial statements are finalised in time', ['Preparation and filing of annual returns and financial statements with the Registrar, as per the package', 'Preparation of minutes and statutory documentation, as per the package']],
  [['trademark'], 'the application will be filed within three to five working days of receipt of complete documents; registration rests with the Trade Marks Registry and ordinarily takes twelve to twenty-four months', ['Search of the trade marks register and search report', 'Filing of the application for registration', 'Monitoring of status and communication of examination reports']],
  [['fssai'], 'the application will be filed within two working days of receipt of complete documents; grant rests with the Food Safety authority', ['Scrutiny of documents and filing of the application', 'Response to queries raised by the authority', 'Furnishing of the registration / licence']],
  [['udyam', 'msme', 'iec', 'shop act', 'professional tax', 'business-registr'], 'ordinarily seven to fifteen working days from receipt of complete documents, subject to processing by the authorities concerned', ['Scrutiny of documents for the registrations comprised in the package', 'Filing of the applications on the respective portals', 'Response to queries raised by the authorities, if any', 'Furnishing of the certificates and login particulars']],
  [['iso'], 'ordinarily ten to twenty working days, subject to audit scheduling by the certification body', ['Gap assessment and documentation support', 'Co-ordination with the certification body', 'Furnishing of the certificate']],
  [['ngo', '12ab', '80g', 'trust', 'society'], 'the applications will be filed within seven working days of receipt of complete documents; approvals rest with the authorities', ['Drafting of constitutional documents, as per the package', 'Filing of applications for registration / approval', 'Representation before the authorities on queries raised']],
  [['notice', 'litigation', 'legal', 'cheque', 'civil', 'criminal', 'property', 'appeal'], 'as per the time limits fixed by the authority or court; drafts will ordinarily be furnished at least two working days before the due date where documents are received in time', ['Study of the notice / matter and the relevant documents', 'Drafting of the reply, submissions or pleadings', 'Filing and representation, as per the package']],
  [['virtual-cfo', 'retainer', 'payroll', 'accounting', 'bookkeeping'], 'continuing monthly service; monthly deliverables will ordinarily be furnished within ten working days after the close of each month', ['Monthly services comprised in the selected package', 'Monthly management information and status report']],
  [['audit'], 'as per the audit plan agreed at the commencement meeting, and in any case before the statutory due dates', ['Planning, execution and reporting in accordance with the applicable Standards on Auditing, by a practising Chartered Accountant associated with CGA']]
];
var timeline = 'ordinarily seven to fifteen working days from receipt of complete documents and information, unless otherwise agreed in writing';
var scope = null;
for (var r of RULES) { if (r[0].some(function (k) { return s.indexOf(k) >= 0; })) { timeline = r[1]; scope = r[2]; break; } }
var tier = tierScope(c.tier, 0);
var tierNote = '';
if (!scope) { scope = tier.length ? tier : ['Professional services described under the selected service on cgaindia.com']; }
else if (tier.length || c.tier) { tierNote = 'The above includes the deliverables listed against Package ' + e(c.tier || '') + ' on the service page at cgaindia.com as on the date of this letter.'; }

var now = new Date(Date.now() + 330 * 60000);
var MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var dateTxt = now.getUTCDate() + ' ' + MON[now.getUTCMonth()] + ' ' + now.getUTCFullYear();
var ymd = String(now.getUTCFullYear()).slice(2) + String(now.getUTCMonth() + 1).padStart(2, '0') + String(now.getUTCDate()).padStart(2, '0');
var engId = 'ENG-' + ymd + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
var fyStart = now.getUTCMonth() >= 3 ? now.getUTCFullYear() : now.getUTCFullYear() - 1;
var fy = fyStart + '-' + String(fyStart + 1).slice(2);
var token = '';
while (token.length < 32) { token += Math.random().toString(36).slice(2); }
token = token.slice(0, 32);
var fee = Number(c.fee || 0);
var taxable = Math.round(fee / 1.18 * 100) / 100;
var gst = Math.round((fee - taxable) * 100) / 100;
var ul = function (arr) { return arr.map(function (x, i) { return '<p class="cl sub"><b>(' + String.fromCharCode(97 + i) + ')</b>' + e(x) + '</p>'; }).join(''); };

var body = cgaLetterhead(e)
  + '<table class="m"><tr><td>Ref.: <b>CGA/' + engId + '/' + fy + '</b></td><td style="text-align:right;padding-left:40px">Date: <b>' + dateTxt + '</b></td></tr></table>'
  + '<p>To<br><b>' + e(c.name) + '</b>' + (c.address ? '<br>' + e(c.address) : '') + (c.gstin ? '<br>GSTIN: ' + e(c.gstin) : '') + '<br>' + e(c.mobile) + (c.email ? ' &middot; ' + e(c.email) : '') + '</p>'
  + '<p><b>Sub.: Engagement for ' + e(c.service) + '</b></p>'
  + '<p>Dear Sir / Madam,</p>'
  + '<p>We thank you for entrusting the above assignment to Canjain Global Advisors Private Limited (&ldquo;CGA&rdquo;, &ldquo;we&rdquo; or &ldquo;us&rdquo;). The purpose of this letter is to confirm the scope of the assignment, the time frame, our fees and the respective responsibilities of yourself (&ldquo;the Client&rdquo;) and of CGA. This letter and the Standard Terms of Engagement annexed to it together govern this assignment and every further assignment we may undertake for you.</p>'
  + '<h2>1. Scope of the assignment</h2><p>Our work shall comprise the following:</p>' + ul(scope)
  + (tierNote ? '<p>' + tierNote + '</p>' : '')
  + '<p>Unless separately agreed in writing, the assignment does not include government fees, challans, taxes, interest, penalties or late fees; representation before any authority or court not mentioned above; or work relating to any other period or entity.</p>'
  + '<h2>2. Time frame</h2><p><b>Expected time frame:</b> ' + e(timeline.charAt(0).toUpperCase() + timeline.slice(1)) + '.</p><p>The time frame commences only on receipt of complete documents, information and approvals, and shall stand extended by any delay on the part of the Client, any government portal or authority, or any third party.</p>'
  + '<h2>3. Professional fees</h2><p>Our fee for the assignment is <b>Rs ' + m(taxable) + '</b> plus Goods and Services Tax at 18% of <b>Rs ' + m(gst) + '</b>, aggregating <b>Rs ' + m(fee) + '</b>' + (c.invoice_no ? ', received under invoice ' + e(c.invoice_no) + (c.payment_id ? ' (payment reference ' + e(c.payment_id) + ')' : '') : '') + '. Government fees, stamp duty, Digital Signature Certificate charges and out-of-pocket expenses are payable at actuals unless expressly included in the package. Where the published fee is a starting fee, any revision for additional scope shall be confirmed to you in writing before that work is undertaken.</p>'
  + '<h2>4. Information, approvals and authority</h2><p>The assignment depends upon your furnishing complete and correct information in time. No return or application will be filed without your prior approval, which may be given in writing, by e-mail or by WhatsApp from the contact details stated above. We shall also send you, on acceptance of this letter, our Client Documentation (a Schedule of Applicable Compliances, a Declaration of Authorised Persons, a Letter of Authority for Representation, a Letter of Authority for statutory portals and a Letter of Representation) for completion online.</p>'
  + '<h2>5. Standard Terms of Engagement</h2><p>The annexed Standard Terms form an integral part of this letter. We would draw your particular attention to the clauses dealing with authority to instruct (clause 4), digital signatures and credentials (clause 5), fees (clause 6), lien (clause 7), limitation of liability (clause 8) and indemnity (clause 9).</p>'
  + '<p>Kindly signify your acceptance of this letter and the annexed Standard Terms by executing the acceptance below. Our team will commence the assignment immediately thereafter.</p>'
  + '<p>Yours faithfully,</p>'
  + '<div class="sig">For <b>Canjain Global Advisors Private Limited</b><div class="sg" style="font-family:&#39;Mrs Saint Delafield&#39;,&#39;Great Vibes&#39;,cursive;font-size:38px">Neeraj Jain</div><div class="ln"><b>Neeraj Jain</b><br>Director</div></div>'
  + '<h2>Acceptance by the Client</h2><p>I/We have read and understood this letter and the annexed Standard Terms of Engagement and accept them for and on behalf of the Client.</p>'
  + 'CLIENT_ACCEPTANCE'
  + '<div style="page-break-before:always;margin-top:26px;border-top:1px solid #999;padding-top:20px">' + cgaLetterhead(e) + cgaStandardTerms({ e: e }) + '<p class="nt" style="margin-top:12px">Annexure to engagement letter Ref. CGA/' + engId + '/' + fy + '</p></div>';
var letter = '<!DOCTYPE html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400&family=Great+Vibes&family=Mrs+Saint+Delafield&display=swap" rel="stylesheet">' + LEGAL_CSS + '</head><body><div class="doc">' + body + '</div></body></html>';
var history = JSON.stringify([{ s: 0, t: new Date().toISOString(), n: 'Engagement letter sent to client' }]);
return Object.assign({}, c, { eng_id: engId, token: token, timeline: timeline, letter_html: letter, history: history, date_txt: dateTxt, link: 'https://cgaindia.com/engagement.html?t=' + token });

}

function cgaKitApi(req, rowsIn, cfg) {
const b = req.body || {};
const h = req.headers || {};
const t = String(b.t || '');
const rows = (rowsIn || []).filter(function (r) { return r && r.token; });
const row = rows.find(function (r) { return r.token === t; });
function out(reply, op, extra) { return [{ json: Object.assign({ reply: reply, op: op || 'none' }, extra || {}) }]; }
if (t.length < 20 || !row || row.status === 'VOID') { return out({ ok: false, error: 'Ye link sahi nahi hai ya band ho chuka hai. CGA team se sampark kariye: 99966-47888.' }); }
function e(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function js(s, d) { try { var v = JSON.parse(s || ''); return v == null ? d : v; } catch (z) { return d; } }
function mask(em) { const p = String(em).split('@'); return p[0].slice(0, 2) + '***@' + (p[1] || ''); }
function istTxt(iso) { const d = new Date(new Date(iso).getTime() + 330 * 60000); return d.toISOString().slice(0, 16).replace('T', ' ') + ' IST'; }
function clean(v, n) { return String(v == null ? '' : v).replace(/[<>]/g, '').trim().slice(0, n || 120); }
function cleanFd(x) {
  x = x || {};
  const o = {};
  o.constitution = clean(x.constitution, 60);
  o.owners = (Array.isArray(x.owners) ? x.owners : []).slice(0, 20).map(function (r) { return { name: clean(r.name, 80), desig: clean(r.desig, 40), din: clean(r.din, 20), share: clean(r.share, 10), mobile: clean(r.mobile, 15), email: clean(r.email, 80), dsc: !!r.dsc }; }).filter(function (r) { return r.name; });
  o.auth = (Array.isArray(x.auth) ? x.auth : []).slice(0, 10).map(function (r) { return { name: clean(r.name, 80), desig: clean(r.desig, 40), mobile: clean(r.mobile, 15), email: clean(r.email, 80), authority: clean(r.authority, 10) || 'Single' }; }).filter(function (r) { return r.name; });
  o.reg = {}; o.logins = {};
  ['GST', 'IT', 'TDS', 'MCA', 'EPF'].forEach(function (p) {
    const r = (x.reg || {})[p] || {}; o.reg[p] = { m: clean(r.m, 15), e: clean(r.e, 80), o: clean(r.o, 60) };
    const l = (x.logins || {})[p] || {}; o.logins[p] = { id: clean(l.id, 40), date: clean(l.date, 20), otp: clean(l.otp, 60) };
  });
  const lo = (x.logins || {}).OTHER || {}; o.logins.OTHER = { portal: clean(lo.portal, 40), id: clean(lo.id, 40), date: clean(lo.date, 20), otp: clean(lo.otp, 60) };
  o.others = clean(x.others, 200) || 'None';
  o.dispute = clean(x.dispute, 300) || 'None';
  const br = x.br || {}; o.br = { date: clean(br.date, 20), time: clean(br.time, 15), director: clean(br.director, 60), din: clean(br.din, 12) };
  o.place = clean(x.place, 40);
  const pp = x.p || {};
  const num = function (v) { const z = Number(String(v == null ? '' : v).replace(/[^0-9.]/g, '')); return isFinite(z) && z > 0 ? Math.round(z * 100) / 100 : 0; };
  const yn = function (v) { return v === true || v === 'yes'; };
  o.p = { state: clean(pp.state, 40), biz: ['none', 'trading', 'manufacturing', 'services', 'profession'].indexOf(pp.biz) > -1 ? pp.biz : 'trading', gst: ['none', 'regular', 'qrmp', 'composition'].indexOf(pp.gst) > -1 ? pp.gst : 'none', to: num(pp.to), cash5: yn(pp.cash5), presum: yn(pp.presum), lowp: yn(pp.lowp), puc: num(pp.puc), res: num(pp.res), borr: num(pp.borr), hs: yn(pp.hs), listed: yn(pp.listed), contrib: num(pp.contrib), tds: yn(pp.tds), emp: num(pp.emp), pf: yn(pp.pf), esi: yn(pp.esi), forex: yn(pp.forex), refund: yn(pp.refund), msme: yn(pp.msme), npo: yn(pp.npo), dep: yn(pp.dep) };
  o.sel = {};
  Object.keys(x.sel || {}).slice(0, 80).forEach(function (kk) { if (/^[a-z0-9]{2,12}$/.test(kk)) { o.sel[kk] = x.sel[kk] === 'client' ? 'client' : 'cga'; } });
  return o;
}
const signed = row.status === 'SIGNED';
const saved = js(row.form_data, null);
const action = String(b.action || 'get');
function view(fd, acc) {
  const r = renderKit(row, fd || {}, acc || null);
  return { ok: true, kit_id: row.kit_id, status: row.status, name: row.name, entity_type: row.entity_type, pan: row.pan, email: row.email, mobile: row.mobile, email_masked: row.email ? mask(row.email) : '', needs_email: !/@/.test(row.email || ''), fy: row.fy, portals: js(row.portals, []), dsc_holders: js(row.dsc_holders, []), has6: r.has6, signed: signed, signer_name: row.signer_name || '', signed_at: row.signed_at ? istTxt(row.signed_at) : '', doc3_status: row.doc3_status || '', html: r.html, print: signed ? r.print : '', saved: saved };
}
if (action === 'get') {
  if (signed) { return out(Object.assign(view(saved, { name: row.signer_name, desig: (saved && saved.signer_desig) || '', at: row.signed_at, ip: row.signed_ip, place: (saved && saved.place) || '' }), { html: row.signed_html || '' })); }
  const v = view(saved || {}, null);
  if ((row.status === 'SENT' || row.status === 'DRAFT') && b.staff !== true) { return out(v, 'open', { token: row.token, opened_at: new Date().toISOString() }); }
  return out(v);
}
if (action === 'preview') {
  if (signed) { return out({ ok: false, error: 'Ye documents pehle hi sign ho chuke hain.' }); }
  return out({ ok: true, html: renderKit(row, cleanFd(b.fd), null).html });
}
if (action === 'otp') {
  if (signed) { return out({ ok: false, error: 'Ye documents pehle hi sign ho chuke hain.' }); }
  if (row.status === 'HOLD') { return out({ ok: false, error: 'Ye link abhi CGA team ke review mein hai. Team ke approve karne ke baad sign ho sakega.' }); }
  let em = String(row.email || '').trim();
  if (!/@/.test(em)) { em = clean(b.email, 120).toLowerCase(); if (!/^[^@ ]+@[^@ ]+[.][a-z]{2,}$/.test(em)) { return out({ ok: false, need_email: true, error: 'Kripya apna sahi email address likhiye. OTP aur signed copy isi par aayegi.' }); } }
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const html = '<div style="font-family:Arial,sans-serif;font-size:15px">Namaste ' + e(row.name) + ',<br><br>CGA Client Documentation (Ref ' + e(row.kit_id) + ') sign karne ke liye aapka OTP hai:<br><br><b style="font-size:26px;letter-spacing:4px">' + otp + '</b><br><br>Ye OTP 10 minute tak valid hai. Ise kisi ke saath share na kariye.<br><br>Team CGA</div>';
  return out({ ok: true, sent_to: mask(em) }, 'otp', { otp: otp, otp_exp: Date.now() + 10 * 60000, token: row.token, email: em, mail_html: html, mail_subject: 'Your CGA signing OTP: ' + otp });
}
if (action === 'sign') {
  if (signed) { return out({ ok: false, error: 'Ye documents pehle hi sign ho chuke hain.' }); }
  if (row.status === 'HOLD') { return out({ ok: false, error: 'Ye link abhi CGA team ke review mein hai.' }); }
  const fd = cleanFd(b.fd);
  const name = clean(b.name, 80);
  const desig = clean(b.desig, 40);
  if (!fd.owners.length) { return out({ ok: false, error: 'Kam se kam ek owner / director / partner ka naam bhariye (Step 1).' }); }
  if (!fd.auth.length || !fd.auth.every(function (a) { return a.mobile || a.email; })) { return out({ ok: false, error: 'Authorised person ka naam aur mobile ya email bhariye (Step 2).' }); }
  if (name.length < 3) { return out({ ok: false, error: 'Kripya sign karne wale ka poora naam likhiye.' }); }
  if (!desig) { return out({ ok: false, error: 'Kripya apna designation likhiye (jaise Director / Partner / Proprietor).' }); }
  if (b.agree !== true) { return out({ ok: false, error: 'Kripya sehmati ka box tick kariye.' }); }
  if (!row.otp || String(b.otp || '').trim() !== String(row.otp) || Date.now() > Number(row.otp_exp || 0)) { return out({ ok: false, error: 'OTP galat hai ya expire ho gaya. Naya OTP mangwaiye.' }); }
  fd.signer_desig = desig;
  const at = new Date().toISOString();
  const ip = String(h['x-forwarded-for'] || h['x-real-ip'] || '').split(',')[0].trim() || 'unknown';
  const acc = { name: name, desig: desig, at: at, ip: ip, place: fd.place, email: row.email };
  const r = renderKit(row, fd, acc);
  const needPrint = !!r.print;
  const v = Object.assign(view(fd, acc), { status: 'SIGNED', signed: true, signer_name: name, signed_at: istTxt(at), html: r.html, print: r.print, doc3_status: needPrint ? 'PENDING' : 'NA', saved: fd });
  const kitUrl = 'https://cgaindia.com/client-kit.html?t=' + row.token;
  const actBase = 'https://cga.app.n8n.cloud/webhook/cga-kit-act?k=' + (cfg && cfg.actKey) + '&id=' + encodeURIComponent(row.kit_id);
  const cHtml = '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6">Namaste ' + e(row.name) + ',<br><br>Aapki CGA Client Documentation (Ref ' + e(row.kit_id) + ') e-sign ho gayi hai. Signed copy (PDF) attached hai.<br><br>' +
    (needPrint ? '<b>Ek kaam baaki hai:</b> ' + (r.holders.length ? 'DSC holder(s) <b>' + e(r.holders.join(', ')) + '</b> ke liye DSC ki Deed of Authorisation and Indemnity stamp paper par sign aur notarise karwa kar ' : '') + (fd.owners.length > 1 ? (r.holders.length ? 'aur ' : '') + 'Declaration ka counterpart signature page sab directors / partners se sign karwa kar ' : '') + 'CGA office mein jama karwaiye. Pre-filled print copy yahan se nikaliye: <a href="' + kitUrl + '">Print pages kholiye</a><br><br>' : '') +
    'Kisi bhi sawal ke liye: 99966-47888<br><br>Team CGA</div>';
  const tHtml = '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6"><b>CGA Client Documentation SIGNED</b><br><br>' + e(row.kit_id) + '<br>Client: ' + e(row.name) + ' (' + e(row.mobile) + ')<br>Signed by: ' + e(name) + ', ' + e(desig) + ' / IP ' + e(ip) + '<br>Owners: ' + e(fd.owners.map(function (o) { return o.name; }).join(', ')) + '<br>Authorised: ' + e(fd.auth.map(function (a) { return a.name + ' ' + (a.mobile || '') + ' ' + (a.email || ''); }).join('; ')) + '<br><br>' +
    (needPrint ? '<b>Physical pending:</b> ' + (r.holders.length ? 'DSC Deed (stamp paper + notary) for ' + e(r.holders.join(', ')) + '. ' : '') + (fd.owners.length > 1 ? 'Declaration counterpart signed by all owners.' : '') + '<br>Jab originals office mein aa jayen: <a href="' + actBase + '&a=doc3" style="display:inline-block;background:#0a7d3c;color:#fff;padding:8px 14px;border-radius:6px;text-decoration:none">Print pack received</a><br><br><b>Rule:</b> DSC Deed aane se pehle DSC custody mein na lein.<br><br>' : 'Koi physical document baaki nahi.<br><br>') +
    'Signed PDF attached. Scan + file in client folder same day.</div>';
  return out(v, 'sign', { token: row.token, signer_name: name, signed_at: at, signed_ip: ip, form_data: JSON.stringify(fd), signed_html: r.html, doc3_status: needPrint ? 'PENDING' : 'NA', email: row.email, client_html: cHtml, team_html: tHtml, client_subject: 'Signed: CGA Client Documentation ' + row.kit_id, team_subject: '[CGA Kit] SIGNED: ' + row.kit_id + ' - ' + row.name + (needPrint ? ' (print pack pending)' : ''), file_name: row.kit_id + '-CGA-Client-Documentation.pdf' });
}
return out({ ok: false, error: 'Unknown action' });

}

function cgaKitNormalize(j) {
function cl(v, n) { return String(v == null ? '' : v).replace(/[<>]/g, '').trim().slice(0, n || 200); }
let src = 'form'; let b = j;
if (j.body) { src = 'engagement'; b = j.body; }
const now = new Date(Date.now() + 330 * 60000);
const fyS = now.getUTCMonth() >= 3 ? now.getUTCFullYear() : now.getUTCFullYear() - 1;
let services = [];
if (Array.isArray(b.services)) { services = b.services; }
else if (typeof b.services === 'string' && b.services.trim()) { services = b.services.split(/[\n;]+/).map(function (l) { const p = l.split('|').map(function (x) { return cl(x, 120); }); const fee = Number(String(p[1] || '').replace(/[^0-9.]/g, '')); return { s: p[0], fee: fee || 0, fee_text: fee ? '' : (p[1] || ''), billing: p[2] || '' }; }).filter(function (s) { return s.s; }); }
if (!services.length && b.service) { services = [{ s: cl(b.service, 150), fee_text: b.eng_ref ? 'As per engagement letter ' + cl(b.eng_ref, 30) : 'As per invoice', billing: 'As agreed' }]; }
const dsc = cl(b.dsc_holders, 300).split(',').map(function (x) { return x.trim(); }).filter(Boolean);
const conflict = cl(b.conflict, 600).split(/[\n]+/).map(function (l) { const p = l.split('|').map(function (x) { return x.trim(); }); return { name: p[0] || '', conn: p[1] || '', interest: p[2] || '' }; }).filter(function (c) { return c.name; });
const mob = cl(b.mobile, 20).replace(/[^0-9]/g, '').slice(-10);
const email = cl(b.email, 120).toLowerCase();
return { source: src, name: cl(b.name, 120), client_code: cl(b.client_code, 30).toUpperCase(), entity_type: cl(b.entity_type, 40) || (src === 'engagement' ? '' : 'Individual'), mobile: mob, email: /@/.test(email) ? email : '', pan: cl(b.pan, 10).toUpperCase(), gstin: cl(b.gstin, 15).toUpperCase(), address: cl(b.address, 200), eng_ref: cl(b.eng_ref, 30), services: JSON.stringify(services), dsc_holders: JSON.stringify(dsc), conflict: JSON.stringify(conflict), fy: fyS + '-' + String(fyS + 1).slice(2), q_email: /@/.test(email) ? email : 'none@none.invalid', q_mobile: mob || '0000000000' };
}
function cgaKitDecide(c, rowsIn) {
function nm(x) { return String(x || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
const rows = (rowsIn || []).filter(function (r) { return r.token && r.status !== 'VOID' && ((c.email && r.email === c.email) || (r.mobile === c.mobile && nm(r.name) === nm(c.name))); });
const yearAgo = Date.now() - 330 * 86400000;
const signed = rows.find(function (r) { return r.status === 'SIGNED' && new Date(r.signed_at || r.created_at || 0).getTime() > yearAgo; });
const open = rows.find(function (r) { return ['DRAFT', 'SENT', 'OPENED'].indexOf(r.status) > -1; });
function rnd(n, set) { let s = ''; for (let i = 0; i < n; i++) { s += set[Math.floor(Math.random() * set.length)]; } return s; }
const d = new Date(Date.now() + 330 * 60000).toISOString();
if (signed) { return Object.assign({}, c, { mode: 'skip', kit_id: signed.kit_id, token: signed.token, status: 'SIGNED' }); }
if (open) { return Object.assign({}, c, { mode: 'update', kit_id: open.kit_id, token: open.token, email: c.email || open.email || '', entity_type: c.entity_type || open.entity_type || '', client_code: c.client_code || open.client_code || '', status: 'SENT' }); }
return Object.assign({}, c, { mode: 'insert', kit_id: 'KIT-' + d.slice(2, 4) + d.slice(5, 7) + d.slice(8, 10) + '-' + rnd(4, 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'), token: rnd(32, 'abcdefghijkmnpqrstuvwxyz23456789'), status: 'SENT' });
}
function cgaKitCompose(d) {
function e(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
const link = 'https://cgaindia.com/client-kit.html?t=' + d.token;
const btn = '<a href="' + link + '" style="display:inline-block;background:#0b4a6e;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:bold">Documents dekhiye aur sign kariye</a>';
const dsc = JSON.parse(d.dsc_holders || '[]');
const intro = d.eng_ref ? 'Aapka engagement letter (Ref ' + e(d.eng_ref) + ') sign ho gaya hai, dhanyavaad. Ab ek aakhri step: CGA ki standard Client Documentation.' : 'CGA ke saath aapka kaam saaf, surakshit aur record par rahe, isliye hum sabhi clients se standard Client Documentation le rahe hain.';
const client = '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.65;color:#14232b">Namaste ' + e(d.name) + ',<br><br>' + intro + '<br><br>Isme ' + (d.eng_ref ? '' : 'Engagement Letter &amp; Standard Terms, ') + 'Declaration of Authorised Persons, Letter of Authority (government portals) aur Letter of Representation shaamil hain. Sab online hai: details bhariye, documents padhiye aur email OTP se sign kariye. Lagbhag 10 minute lagenge, print ya courier ki zarurat nahi.<br><br>' + btn + '<br><br>' + (dsc.length ? 'Note: ' + e(dsc.join(', ')) + ' ka DSC CGA ke paas hai. Uske liye Deed of Authorisation and Indemnity stamp paper par sign aur notarise karwana hoga; online sign ke baad uski bhari hui print copy mil jayegi.<br><br>' : '') + '<span style="font-size:13px;color:#5a6b76">Ye link sirf aapke liye hai. Koi sawal ho to call / WhatsApp: 99966-47888.</span><br><br>Team CGA<br>Canjain Global Advisors Pvt Ltd</div>';
const wa = 'Namaste ' + d.name + ' ji,\n\nCGA mein aapke records aur kaam ko surakshit aur record par rakhne ke liye hum sabhi clients se standard Client Documentation (Engagement Letter, Authorised Persons Declaration, Portal Authority) le rahe hain. Ye online hai, lagbhag 10 minute lagenge, email OTP se sign hota hai:\n' + link + '\n\nKoi sawal ho to isi number par message kariye.\nTeam CGA - Canjain Global Advisors';
const waUrl = d.mobile ? 'https://wa.me/91' + d.mobile + '?text=' + encodeURIComponent(wa) : '';
const team = '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6">' + (d.mode === 'skip' ? '<b>Is client ki Client Documentation pehle hi SIGNED hai</b> (' + e(d.kit_id) + '). Naya link nahi bheja gaya.' : '<b>Client Documentation ' + (d.mode === 'update' ? 'dobara bheji gayi' : 'bheji gayi') + '</b>') + '<br><br>' + e(d.kit_id) + ' &middot; ' + e(d.name) + (d.client_code ? ' (' + e(d.client_code) + ')' : '') + '<br>Mobile: ' + e(d.mobile || '-') + ' &middot; Email: ' + e(d.email || 'nahi hai') + '<br>Source: ' + e(d.source) + (d.eng_ref ? ' / ' + e(d.eng_ref) : '') + '<br>DSC with CGA: ' + e(dsc.join(', ') || 'None') + '<br><br>Client link: <a href="' + link + '">' + link + '</a>' + (waUrl && d.mode !== 'skip' ? '<br><br><a href="' + waUrl + '" style="display:inline-block;background:#25d366;color:#fff;padding:9px 16px;border-radius:6px;text-decoration:none;font-weight:bold">WhatsApp par link bhejiye</a>' : '') + (d.email ? '' : '<br><b>Client ka email nahi hai - WhatsApp se link zaroor bhejiye.</b>') + '</div>';
return { has_email: !!d.email && d.mode !== 'skip', email: d.email, client_html: client, client_subject: (d.eng_ref ? 'Ek aakhri step: ' : 'Action needed: ') + 'CGA Client Documentation (Ref ' + d.kit_id + ')', team_html: team, team_subject: '[CGA Kit] ' + (d.mode === 'skip' ? 'Already signed' : 'Sent') + ': ' + d.kit_id + ' - ' + d.name };
}
function cgaKitDue(rowsIn) {
function e(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
const now = Date.now(); const D2 = 2 * 86400000;
return (rowsIn || []).filter(function (r) {
  if (!/@/.test(r.email || '') || !r.token) { return false; }
  const sent = new Date(r.sent_at || r.created_at || 0).getTime(); const last = new Date(r.last_reminder || 0).getTime();
  return Number(r.reminder_count || 0) < 3 && now - sent > D2 && now - last > D2;
}).slice(0, 80).map(function (r) {
  const link = 'https://cgaindia.com/client-kit.html?t=' + r.token;
  const html = '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.65;color:#14232b">Namaste ' + e(r.name) + ',<br><br>Ek chhota sa reminder: aapki CGA Client Documentation (Ref ' + e(r.kit_id) + ') abhi sign hona baaki hai. Isme lagbhag 10 minute lagenge.<br><br><a href="' + link + '" style="display:inline-block;background:#0b4a6e;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:bold">Documents dekhiye aur sign kariye</a><br><br>Koi sawal ho to call / WhatsApp: 99966-47888.<br><br>Team CGA<br>Canjain Global Advisors Pvt Ltd</div>';
  return { token: r.token, email: r.email, html: html, subject: 'Reminder: CGA Client Documentation (Ref ' + r.kit_id + ')', count: Number(r.reminder_count || 0) + 1 };
});
}

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/Homepage';
import Sales from './components/Categories/SalesJobs/Sales';
import IT from './components/Categories/ITjobs/ITjobs';
import Jobs from './components/JobPage';
import SignUpPage from './components/auth/SignUpPage'; // The new SignUp component
import Login from './components/auth/Login';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'; // Import Footer
import '@fortawesome/fontawesome-free/css/all.min.css';
import Marketing from './components/Categories/Marketingjobs/Marketing';
import DataScienceJobs from './components/Categories/DataScience/DataScience';
import HR from './components/Categories/HR/HR';
import SkilledManPowerJobs from './components/Categories/SkilledmanPower/Skilled';
import Engineering from './components/Categories/Engineeringjobs/Engineering';
import JobsInDelhi from './components/Categories/JobInDelhi/JobsInDelhi';
import JobsInMumbai from './components/Categories/jobsinmumbai/JobsInMumbai';
import JobsInBangalore from './components/Categories/jobsinbangalore/JobsInBangalore';
import JobsInHyderabad from './components/Categories/jobsinhyderabad/JobsInHyderabad';
import JobsInChennai from './components/Categories/jobsinchennai/JobsInChennai';
import JobsInPune from './components/Categories/jobsinpune/JobsInPune';
import RemoteJobs from './components/Categories/remotejob/RemoteJobs';
import WorkFromHomeJobs from './components/Categories/workfromhomejobs/WorkFromHomeJobs';
import WalkInJobs from './components/Categories/walkinjobs/WalkInJobs';
import PartTimeJobs from './components/Categories/parttimejobs/PartTimeJobs';
import FresherJobs from './components/DemandJob/FresherJob/Fresher';
import UnicornCompanies from './components/Company/category/Unicorn/Unicorn';
import SkilledManpowerCompanies from './components/Company/category/Skilledmanpower/Skilledmanpower';
import MncCompanies from './components/Company/category/Mnc/Mnc';
import StartUpCompanies from './components/Company/category/StartUp/StartUp';
import ProductBased from './components/Company/category/ProductBased/ProductBased';
import TopCompanies from './components/Company/Collection/TopCompanies/TopCompanies';
import ItCompanies from './components/Company/Collection/ItCompanies/ItCompanies';
import FintechCompanies from './components/Company/Collection/FintechCompanies/FintechCompanies';
import InternetCompanies from './components/Company/category/Internet/Internet';
import MncJobs from './components/DemandJob/Mncjob/Mnc';
import SponsoredCompanies from './components/Company/category/SponsoredCompanies/SponsoredCompanies';
import FeaturedCompanies from './components/Company/category/FeaturedCompanies/FeaturedCompanies';
import InterviewQuestion from './components/Company/category/InterviewQuestions/InterviewQuestion';
import CompanySalaries from './components/Company/category/CompanySalaries/CompanySalaries';
import CompanyReview from './components/Company/category/CompanyReviews/CompanyReviews';
import SalaryCalculator from './components/Company/category/SalaryCalculator/SalaryCalculator';
import TextResume from './components/Company/category/TextResume/TextResume';
import VisualResume from './components/Company/category/VisualResume/VisualResume';
import ResumeCritique from './components/Company/category/ResumeCritique/ResumeCritique';
import ResumeDisplay from './components/Company/category/ResumeDisplay/ResumeDisplay';
import ResumeQualityScore from './components/Company/category/ResumeQualityScore/ResumeQualityScore';
import ResumeSamples from './components/Company/category/ResumeSamples/ResumeSamples';
import JobLetterSamples from './components/Company/category/JobLetterSamples/JobLetterSamples';
import Aboutus from './components/Aboutus/Aboutus';
import Overview from './components/Aboutus/Overview/Overview';
import BasicPremiumPlans from './components/Company/category/BasicPremiumPlans/BasicPremiumPlans';
import SiteMap from './components/Sitemap/Sitemap';
import Credits from './components/Credits/Credits';
import HelpCenter from './components/HelpCenter/HelpCenter';
import SummonsNotices from './components/SummonsNotices/SummonsNotices';
import Grievances from './components/Categories/Grievances/Grievances';
import ReportIssue from './components/ReportIssue/ReportIssue';
import Careers from './components/Careers/Careers';
import EmployerHome from './components/EmployerHome/Employerhome';
import Privacypolicy from './components/LegalInformation/PrivacyPolicy/Privacypolicy';
import TermsandConditions from './components/LegalInformation/TermsConditions/TermsConsitions';
import FraudAlert from './components/LegalInformation/FreaudAlert/FraudAlert';
import TrustSafety from './components/LegalInformation/Trust&Safety/Trust';
import Hospitality from './components/Industry/ConsumerIndustry/Hospitality/Hospitality';
import Retail from './components/Industry/ConsumerIndustry/Retail/Retail';
import BankingandcapitalMarkets from './components/Industry/FinancialServices/Bankingandcapitalmarkets/Banking';
import Financial from './components/Industry/FinancialServices/FinancialServices/Financial';
import Insurance from './components/Industry/FinancialServices/Insurance/Insurance';
import InvestmentManagement from './components/Industry/FinancialServices/InvestmentManagement/Investment';
import Manufacturing from './components/Categories/Manufacturing/Manufacturing';
import Healthcare from './components/Categories/HealthcareAndLifeSciences/Healthcare';
import LifeScience from './components/Categories/HealthcareAndLifeSciences/LifeSciences';
import ProfessionalBusinessServices from './components/Categories/Professional&BusinessServices/Professional&BusinessServices';
import HigherEducation from './components/Categories/PublicServices/HigherEducation';
import Nonprofit from './components/Categories/PublicServices/Nonprofit';
import PublicSector from './components/Categories/PublicServices/PublicSector';
import SpecialDistricts from './components/Categories/PublicServices/SpecialDistricts';
import StateLocalGovernment from './components/Categories/PublicServices/StateLocalGovernment';
import USFederalGovernment from './components/Categories/PublicServices/USFederalGovernment';


const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/signup" element={<SignUpPage />} />  {/* SignUp Page */}
                <Route path="/login" element={<Login />} />
                <Route path="/it-jobs" element={<IT />} />
                <Route path="/sales-jobs" element={<Sales />} /> {/* SalesJobs component */}
                <Route path="/marketing-jobs" element={<Marketing />} />
                <Route path="/data-science-jobs" element={<DataScienceJobs />} />
                <Route path="/hr-jobs" element={<HR />} />
                <Route path="/manpower-jobs" element={<SkilledManPowerJobs />} />
                <Route path="/engineering-jobs" element={<Engineering />} />
                <Route path="/jobs-in-delhi" element={<JobsInDelhi />} />
                <Route path="/jobs-in-mumbai" element={<JobsInMumbai />} />
                <Route path="/jobs-in-bangalore" element={<JobsInBangalore />} />
                <Route path="/jobs-in-hyderabad" element={<JobsInHyderabad />} />
                <Route path="/jobs-in-chennai" element={<JobsInChennai />} />
                <Route path="/jobs-in-pune" element={<JobsInPune />} />
                <Route path="/remote-jobs" element={<RemoteJobs />} />
                <Route path="/work-from-home-jobs" element={<WorkFromHomeJobs />} />
                <Route path="/walk-in-jobs" element={<WalkInJobs />} />
                <Route path="/part-time-jobs" element={<PartTimeJobs />} />
                <Route path="/fresher-jobs" element={<FresherJobs />} />
                <Route path="/unicorn-companies" element={<UnicornCompanies />} />
                <Route path="/skilled-manpower-companies" element={<SkilledManpowerCompanies />} />
                <Route path="/mnc-companies" element={<MncCompanies />} />
                <Route path="/startup-companies" element={<StartUpCompanies />} />
                <Route path="/product-based-companies" element={<ProductBased />} />
                <Route path="/top-companies" element={<TopCompanies />} />
                <Route path="/it-companies" element={<ItCompanies />} />
                <Route path="/fintech-companies" element={<FintechCompanies />} />
                <Route path="/internet-companies" element={<InternetCompanies />} />
                <Route path="/mnc-jobs" element={<MncJobs />} />
                <Route path="/about-us" element={<Aboutus />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/careers" element={<Careers/>} />
                <Route path="/employer-home" element={<EmployerHome/>} />
                <Route path="/sponsored-companies" element={<SponsoredCompanies />} />
                <Route path="/featured-companies" element={<FeaturedCompanies />} />
                <Route path="/interview-questions" element={<InterviewQuestion />} />
                <Route path="/company-salaries" element={<CompanySalaries />} />
                <Route path="/company-reviews" element={<CompanyReview />} />
                <Route path="/salary-calculator" element={<SalaryCalculator />} />
                <Route path="/text-resume" element={<TextResume />} />
                <Route path="/visual-resume" element={<VisualResume />} />
                <Route path="/resume-critique" element={<ResumeCritique />} />
                <Route path="/resume-display" element={<ResumeDisplay />} />
                <Route path="/resume-quality-score" element={<ResumeQualityScore />} />
                <Route path="/resume-samples" element={<ResumeSamples />} />
                <Route path="/job-letter-samples" element={<JobLetterSamples />} />
                {/* Add more routes here as needed */}
                <Route path="/about-us" element={<Aboutus />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/summons-notices" element={<SummonsNotices />} />
                <Route path="/grievances" element={<Grievances />} />
                <Route path="/report-issue" element={<ReportIssue />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/employer-home" element={<EmployerHome />} />
                {/* Add more routes here as needed */}
                <Route path="/sitemap" element={<SiteMap />} />
                <Route path="/credits" element={<Credits />} />
                <Route path="/privacy-policy" element={<Privacypolicy />} />
                <Route path="/terms-conditions" element={<TermsandConditions />} />
                <Route path="/fraud-alert" element={<FraudAlert />} />
                <Route path="/trust-safety" element={<TrustSafety />} />
                <Route path="/industries-hospitality" element={<Hospitality />} />
                <Route path="/industries-retail" element={<Retail />} />
                <Route path="/industries-banking" element={<BankingandcapitalMarkets />} />
                <Route path="/industries-financial-services" element={<Financial />} />
                <Route path="/industries-insurance" element={<Insurance />} />
                <Route path="/industries-investment-management" element={<InvestmentManagement />} />
                <Route path="/basic-premium-plans" element={<BasicPremiumPlans />} />
                <Route path="/industries-manufacturing" element={<Manufacturing />} />
                <Route path="/industries-healthcare" element={<Healthcare />} />
                <Route path="/industries-life-sciences" element={<LifeScience />} />
                <Route path="/industries-business-services" element={<ProfessionalBusinessServices /> } />
                <Route path="/industries-higher-education" element={<HigherEducation />} />
                <Route path="/industries-nonprofit" element={<Nonprofit />} />
                <Route path="/industries-public-sector" element={<PublicSector />} />
                <Route path="/industries-special-districts" element={<SpecialDistricts />} />
                <Route path="/industries-state-local-government" element={<StateLocalGovernment />} />
                <Route path="/industries-us-federal-government" element ={<USFederalGovernment />} />

            </Routes>
            <Footer />
        </Router>
    );
};

export default App;

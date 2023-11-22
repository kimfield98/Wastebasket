import CountryInfo from "@/app/components/CountryInfo";
import LeftSidebar from "../../components/LeftSidebar";

const Nation = () => {

  return (
      <>
      <main className='flex flex-row'>
        <LeftSidebar />
        <section className='main-container'>
          <CountryInfo />
          {/* <DisastersList/> */}
        </section>
      </main>
    </>
  );
};

export default Nation;
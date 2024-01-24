import ProductCard from "../components/Product";
import TopBackgroud from "../components/TopBackgroud";
import Filter from "../components/Filter";

export default function cart() {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <TopBackgroud />
          <Filter notfilter={false} />
          <ProductCard cardType={true} />
        </div>
      </div>
    </div>
  );
}

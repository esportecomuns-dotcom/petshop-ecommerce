import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { categories, animals } from "@/data/products";
import { useProducts } from "@/contexts/ProductsContext";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const Products = () => {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState(searchParams.get("animal") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))), []);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                           p.description.toLowerCase().includes(search.toLowerCase());
      const matchesAnimal = !selectedAnimal || p.animal === selectedAnimal;
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesBrand = !selectedBrand || p.brand === selectedBrand;
      
      return matchesSearch && matchesAnimal && matchesCategory && matchesPrice && matchesBrand;
    });

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "popular") result.sort((a, b) => b.reviewCount - a.reviewCount);
    
    return result;
  }, [search, selectedAnimal, selectedCategory, priceRange, selectedBrand, sortBy]);

  const clearFilters = () => { 
    setSearch("");
    setSelectedAnimal(""); 
    setSelectedCategory(""); 
    setPriceRange([0, 500]);
    setSelectedBrand("");
  };
  
  const hasFilters = search || selectedAnimal || selectedCategory || selectedBrand || priceRange[0] > 0 || priceRange[1] < 500;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Produtos</h1>
            <p className="text-muted-foreground text-sm mt-1">{filtered.length} produtos encontrados</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar produtos..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring h-10"
            >
              <option value="popular">Mais populares</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 border border-border rounded-lg hover:bg-muted h-10 w-10 flex items-center justify-center"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? "fixed inset-0 z-50 bg-background p-6 overflow-y-auto" : "hidden"} md:block md:static md:w-64 shrink-0 space-y-8`}>
            <div className="flex items-center justify-between md:hidden mb-6">
              <h3 className="font-bold text-lg text-foreground">Filtros</h3>
              <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-muted rounded-full">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Filtrar por</h4>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-primary font-semibold hover:underline">
                  Limpar tudo
                </button>
              )}
            </div>

            {/* Animal Section */}
            <div>
              <h4 className="font-bold text-sm text-foreground mb-4">Mascote</h4>
              <div className="grid grid-cols-2 gap-2">
                {animals.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAnimal(selectedAnimal === a.id ? "" : a.id)}
                    className={`text-left text-xs px-3 py-2 rounded-lg transition-all border ${
                      selectedAnimal === a.id 
                        ? "bg-primary border-primary text-primary-foreground font-semibold" 
                        : "hover:border-primary/50 text-foreground border-border bg-card"
                    }`}
                  >
                    {a.emoji} {a.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Section */}
            <div>
              <h4 className="font-bold text-sm text-foreground mb-4">Categoria</h4>
              <div className="space-y-1">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(selectedCategory === c.id ? "" : c.id)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === c.id ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <span>{c.icon} {c.name}</span>
                    {selectedCategory === c.id && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands Section */}
            <div>
              <h4 className="font-bold text-sm text-foreground mb-4">Marcas</h4>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(selectedBrand === brand ? "" : brand)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      selectedBrand === brand 
                        ? "bg-foreground text-background border-foreground font-medium" 
                        : "border-border hover:border-foreground/30 text-muted-foreground"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-sm text-foreground">Preço</h4>
                <span className="text-xs font-medium text-primary">R$ {priceRange[0]} - R$ {priceRange[1]}</span>
              </div>
              <Slider
                value={priceRange}
                min={0}
                max={500}
                step={10}
                onValueChange={setPriceRange}
                className="mt-6"
              />
              <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                <span>R$ 0</span>
                <span>R$ 500+</span>
              </div>
            </div>
            
            <button 
              className="w-full md:hidden bg-primary text-primary-foreground font-bold py-3 rounded-xl mt-6"
              onClick={() => setShowFilters(false)}
            >
              Ver {filtered.length} Resultados
            </button>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
                <p className="text-5xl mb-4">🐕</p>
                <h3 className="text-xl font-bold text-foreground">Xii, nada por aqui...</h3>
                <p className="text-muted-foreground mt-2">Tente ajustar seus filtros ou buscar outro termo.</p>
                <button onClick={clearFilters} className="mt-6 bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity">
                  Limpar todos os filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;


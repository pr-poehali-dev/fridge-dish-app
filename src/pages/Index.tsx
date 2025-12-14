import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

type TabType = 'home' | 'search' | 'favorites' | 'categories';

const POPULAR_INGREDIENTS = [
  { name: 'Курица', icon: '🍗', category: 'meat' },
  { name: 'Помидоры', icon: '🍅', category: 'vegetables' },
  { name: 'Сыр', icon: '🧀', category: 'dairy' },
  { name: 'Яйца', icon: '🥚', category: 'dairy' },
  { name: 'Картофель', icon: '🥔', category: 'vegetables' },
  { name: 'Рис', icon: '🍚', category: 'grains' },
  { name: 'Лук', icon: '🧅', category: 'vegetables' },
  { name: 'Чеснок', icon: '🧄', category: 'vegetables' },
  { name: 'Макароны', icon: '🍝', category: 'grains' },
  { name: 'Молоко', icon: '🥛', category: 'dairy' },
];

const SAMPLE_RECIPES = [
  {
    id: 1,
    title: 'Куриный суп с лапшой',
    time: '45 мин',
    difficulty: 'Легко',
    ingredients: ['Курица', 'Лук', 'Морковь', 'Лапша'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
  },
  {
    id: 2,
    title: 'Паста Карбонара',
    time: '25 мин',
    difficulty: 'Средне',
    ingredients: ['Макароны', 'Яйца', 'Сыр', 'Бекон'],
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400',
  },
  {
    id: 3,
    title: 'Греческий салат',
    time: '15 мин',
    difficulty: 'Легко',
    ingredients: ['Помидоры', 'Огурцы', 'Сыр Фета', 'Оливки'],
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
  },
];

const CATEGORIES = [
  { name: 'Супы', icon: '🍲', count: 45 },
  { name: 'Салаты', icon: '🥗', count: 67 },
  { name: 'Горячее', icon: '🍛', count: 123 },
  { name: 'Десерты', icon: '🍰', count: 89 },
  { name: 'Выпечка', icon: '🥐', count: 56 },
  { name: 'Напитки', icon: '🥤', count: 34 },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const toggleFavorite = (recipeId: number) => {
    setFavorites((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
  };

  const addToShoppingList = (ingredients: string[]) => {
    setShoppingList((prev) => {
      const newIngredients = ingredients.filter((ing) => !prev.includes(ing));
      return [...prev, ...newIngredients];
    });
  };

  const renderHome = () => (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white px-6 pt-12 pb-32 rounded-b-[3rem]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-5xl">🍳</div>
            <h1 className="text-3xl font-bold">Блюдо из Холодильника</h1>
          </div>
          
          <div className="w-full max-w-sm mb-8">
            <img
              src="https://cdn.poehali.dev/projects/520baae2-04c7-4790-81d5-5c37661fca78/files/f69798fa-905e-46b0-bd91-8647d80de692.jpg"
              alt="Chef with fridge"
              className="w-full h-48 object-cover rounded-2xl shadow-2xl animate-scale-in"
            />
          </div>
          
          <h2 className="text-xl font-semibold mb-2 px-4">
            Выберите продукты и мы подберём идеальный рецепт
          </h2>
          <p className="text-white/80 text-sm mb-6">
            Создайте вкусные блюда из того, что есть под рукой
          </p>
        </div>
      </div>

      <div className="px-6 -mt-20 relative z-20 animate-slide-up">
        <Card className="bg-white shadow-xl p-6 rounded-3xl border-0">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Популярные ингредиенты</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {POPULAR_INGREDIENTS.map((ingredient) => (
              <Badge
                key={ingredient.name}
                variant={selectedIngredients.includes(ingredient.name) ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer px-4 py-2 text-sm transition-all duration-200 hover:scale-105',
                  selectedIngredients.includes(ingredient.name)
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-md'
                    : 'border-gray-300 hover:border-orange-400'
                )}
                onClick={() => toggleIngredient(ingredient.name)}
              >
                <span className="mr-1">{ingredient.icon}</span>
                {ingredient.name}
              </Badge>
            ))}
          </div>
          
          {selectedIngredients.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Выбрано: {selectedIngredients.length} ингредиентов
              </p>
              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-6 rounded-2xl shadow-lg transition-all duration-200 hover:scale-[1.02]"
                onClick={() => setActiveTab('search')}
              >
                <Icon name="Search" className="mr-2" />
                Найти рецепты
              </Button>
            </div>
          )}
          
          <Button
            variant="outline"
            className="w-full border-2 border-purple-500 text-purple-600 font-semibold py-6 rounded-2xl hover:bg-purple-50 transition-all duration-200"
            onClick={() => setActiveTab('favorites')}
          >
            <Icon name="Heart" className="mr-2" />
            Мои рецепты
          </Button>
        </Card>
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="flex flex-col min-h-screen pb-24 px-6 pt-6">
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Поиск рецептов</h1>
        <div className="relative">
          <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Найти рецепт..."
            className="pl-12 py-6 rounded-2xl border-2 border-gray-200 focus:border-orange-500"
          />
        </div>
      </div>

      {selectedIngredients.length > 0 && (
        <div className="mb-6 animate-slide-up">
          <p className="text-sm text-gray-600 mb-2">
            Рецепты с вашими ингредиентами ({selectedIngredients.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((ingredient) => (
              <Badge key={ingredient} className="bg-orange-100 text-orange-700 px-3 py-1">
                {ingredient}
                <button
                  onClick={() => toggleIngredient(ingredient)}
                  className="ml-2 hover:text-orange-900"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {SAMPLE_RECIPES.map((recipe, index) => (
          <Card
            key={recipe.id}
            className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-up rounded-3xl"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex gap-4 p-4">
              <div className="relative flex-shrink-0">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-24 h-24 object-cover rounded-2xl"
                />
                <button
                  onClick={() => toggleFavorite(recipe.id)}
                  className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <Icon
                    name="Heart"
                    size={16}
                    className={cn(
                      'transition-colors',
                      favorites.includes(recipe.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    )}
                  />
                </button>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 mb-1 truncate">{recipe.title}</h3>
                <div className="flex gap-3 text-xs text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    {recipe.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="ChefHat" size={14} />
                    {recipe.difficulty}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full rounded-xl text-xs border-orange-300 text-orange-600 hover:bg-orange-50"
                  onClick={() => addToShoppingList(recipe.ingredients)}
                >
                  <Icon name="ShoppingCart" size={14} className="mr-1" />
                  В список покупок
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderFavorites = () => {
    const favoriteRecipes = SAMPLE_RECIPES.filter((recipe) => favorites.includes(recipe.id));

    return (
      <div className="flex flex-col min-h-screen pb-24 px-6 pt-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 animate-fade-in">
          Избранные рецепты
        </h1>

        {favoriteRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <Icon name="Heart" size={64} className="text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">У вас пока нет избранных рецептов</p>
            <p className="text-sm text-gray-400 mb-6">
              Добавляйте понравившиеся рецепты, чтобы легко их находить
            </p>
            <Button
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white"
              onClick={() => setActiveTab('search')}
            >
              Найти рецепты
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteRecipes.map((recipe, index) => (
              <Card
                key={recipe.id}
                className="overflow-hidden border-0 shadow-lg rounded-3xl animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-4 p-4">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-24 h-24 object-cover rounded-2xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{recipe.title}</h3>
                    <div className="flex gap-3 text-xs text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {recipe.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="ChefHat" size={14} />
                        {recipe.difficulty}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 rounded-xl text-xs"
                        onClick={() => toggleFavorite(recipe.id)}
                      >
                        Удалить
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl text-xs"
                      >
                        Готовить
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {shoppingList.length > 0 && (
          <Card className="mt-6 p-4 border-0 shadow-lg rounded-3xl bg-purple-50 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Icon name="ShoppingCart" size={20} />
                Список покупок
              </h3>
              <Badge className="bg-purple-500 text-white">{shoppingList.length}</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {shoppingList.map((item) => (
                <Badge key={item} variant="outline" className="bg-white">
                  {item}
                </Badge>
              ))}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="w-full mt-3 text-purple-600"
              onClick={() => setShoppingList([])}
            >
              Очистить список
            </Button>
          </Card>
        )}
      </div>
    );
  };

  const renderCategories = () => (
    <div className="flex flex-col min-h-screen pb-24 px-6 pt-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 animate-fade-in">Категории</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {CATEGORIES.map((category, index) => (
          <Card
            key={category.name}
            className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer rounded-3xl bg-gradient-to-br from-white to-gray-50 animate-scale-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="text-center">
              <div className="text-5xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} рецептов</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'search' && renderSearch()}
        {activeTab === 'favorites' && renderFavorites()}
        {activeTab === 'categories' && renderCategories()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-2xl">
        <div className="flex justify-around max-w-md mx-auto">
          {[
            { id: 'home' as TabType, icon: 'Home', label: 'Главная' },
            { id: 'search' as TabType, icon: 'Search', label: 'Поиск' },
            { id: 'favorites' as TabType, icon: 'Heart', label: 'Избранное' },
            { id: 'categories' as TabType, icon: 'Grid3x3', label: 'Категории' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex flex-col items-center gap-1 transition-all duration-200',
                activeTab === tab.id ? 'text-orange-500 scale-110' : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <Icon
                name={tab.icon as any}
                size={24}
                className={cn(activeTab === tab.id && 'drop-shadow-md')}
              />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

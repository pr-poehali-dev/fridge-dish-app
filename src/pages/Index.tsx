import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import recipesData from '@/data/recipes-raw.json';

type TabType = 'home' | 'search' | 'favorites' | 'categories' | 'ingredients' | 'recipe';

const ALL_INGREDIENTS = [
  { name: 'Курица', icon: '🍗', category: 'meat' },
  { name: 'Говядина', icon: '🥩', category: 'meat' },
  { name: 'Свинина', icon: '🥓', category: 'meat' },
  { name: 'Рыба', icon: '🐟', category: 'meat' },
  { name: 'Креветки', icon: '🦐', category: 'meat' },
  { name: 'Помидоры', icon: '🍅', category: 'vegetables' },
  { name: 'Огурцы', icon: '🥒', category: 'vegetables' },
  { name: 'Морковь', icon: '🥕', category: 'vegetables' },
  { name: 'Сыр', icon: '🧀', category: 'dairy' },
  { name: 'Яйца', icon: '🥚', category: 'dairy' },
  { name: 'Картофель', icon: '🥔', category: 'vegetables' },
  { name: 'Картошка', icon: '🥔', category: 'vegetables' },
  { name: 'Рис', icon: '🍚', category: 'grains' },
  { name: 'Лук', icon: '🧅', category: 'vegetables' },
  { name: 'Чеснок', icon: '🧄', category: 'vegetables' },
  { name: 'Макароны', icon: '🍝', category: 'grains' },
  { name: 'Молоко', icon: '🥛', category: 'dairy' },
  { name: 'Масло', icon: '🧈', category: 'dairy' },
  { name: 'Перец', icon: '🌶️', category: 'vegetables' },
  { name: 'Баклажан', icon: '🍆', category: 'vegetables' },
  { name: 'Кабачок', icon: '🥒', category: 'vegetables' },
  { name: 'Брокколи', icon: '🥦', category: 'vegetables' },
  { name: 'Грибы', icon: '🍄', category: 'vegetables' },
  { name: 'Капуста', icon: '🥬', category: 'vegetables' },
  { name: 'Свекла', icon: '🧅', category: 'vegetables' },
  { name: 'Тыква', icon: '🎃', category: 'vegetables' },
  { name: 'Хлеб', icon: '🍞', category: 'grains' },
  { name: 'Мука', icon: '🌾', category: 'grains' },
  { name: 'Сахар', icon: '🍬', category: 'other' },
  { name: 'Соль', icon: '🧂', category: 'other' },
  { name: 'Лимон', icon: '🍋', category: 'fruits' },
  { name: 'Яблоко', icon: '🍎', category: 'fruits' },
  { name: 'Банан', icon: '🍌', category: 'fruits' },
  { name: 'Апельсин', icon: '🍊', category: 'fruits' },
];

const POPULAR_INGREDIENTS = ALL_INGREDIENTS.slice(0, 10);

const SAMPLE_RECIPES = recipesData.recipes;

const RECIPE_CATEGORIES = [
  'Все блюда',
  'Салаты',
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Все блюда');
  const [currentRecipe, setCurrentRecipe] = useState<number | null>(null);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients((prev) => [...prev, ingredient]);
    }
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) => prev.filter((i) => i !== ingredient));
  };

  const filteredIngredients = ALL_INGREDIENTS.filter(
    (ing) =>
      ing.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedIngredients.includes(ing.name)
  ).slice(0, 8);

  const filteredRecipes = SAMPLE_RECIPES.filter((recipe) => {
    const matchesCategory = selectedCategory === 'Все блюда' || recipe.category === selectedCategory;
    return matchesCategory;
  });

  const getCategoryCount = (category: string) => {
    if (category === 'Все блюда') return SAMPLE_RECIPES.length;
    return SAMPLE_RECIPES.filter((r) => r.category === category).length;
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
                onClick={() => setActiveTab('ingredients')}
              >
                <Icon name="Plus" className="mr-2" />
                Выбрать ингредиенты
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
    <div className="flex flex-col min-h-screen pb-24 bg-gray-50">
      <div className="sticky top-0 z-30 bg-white px-6 pt-6 pb-4 shadow-sm">
        <div className="mb-4 animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Найдено {filteredRecipes.length} рецептов
          </h1>
        </div>

        {selectedIngredients.length > 0 && (
          <div className="mb-4 animate-slide-up">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              С вашими продуктами:
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient) => (
                <Badge key={ingredient} className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1.5 text-xs">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">Выберите категорию блюд</p>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {RECIPE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'flex-shrink-0 px-4 py-2.5 rounded-2xl font-medium text-sm transition-all duration-200 whitespace-nowrap',
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {category} ({getCategoryCount(category)})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pt-4 space-y-4">
        {filteredRecipes.map((recipe, index) => {
          const availableIngredients = recipe.ingredients.filter((ing) =>
            selectedIngredients.includes(ing)
          );
          const missingIngredients = recipe.ingredients.filter((ing) =>
            !selectedIngredients.includes(ing)
          );
          const hasCount = availableIngredients.length;
          const needCount = missingIngredients.length;

          return (
            <Card
              key={recipe.id}
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up rounded-3xl"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="p-4">
                <div className="flex gap-4 mb-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-2 text-base">{recipe.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Icon name="ChefHat" size={14} className="text-orange-500" />
                        <span className="font-medium">{recipe.difficulty}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Icon name="Clock" size={14} className="text-orange-500" />
                        <span>{recipe.time}</span>
                      </div>
                    </div>
                    
                    {selectedIngredients.length > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-xs font-semibold text-gray-700">
                            {hasCount} есть
                          </span>
                        </div>
                        {needCount > 0 && (
                          <>
                            <span className="text-gray-400">+</span>
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                              <span className="text-xs font-semibold text-gray-700">
                                {needCount} нужно
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => toggleFavorite(recipe.id)}
                    className="flex-shrink-0 self-start p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Icon
                      name="Heart"
                      size={20}
                      className={cn(
                        'transition-colors',
                        favorites.includes(recipe.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                      )}
                    />
                  </button>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-xl"
                  size="sm"
                  onClick={() => {
                    setCurrentRecipe(recipe.id);
                    setActiveTab('recipe');
                  }}
                >
                  Посмотреть рецепт
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            </Card>
          );
        })}
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

  const renderRecipe = () => {
    const recipe = SAMPLE_RECIPES.find((r) => r.id === currentRecipe);
    if (!recipe) return null;

    return (
      <div className="flex flex-col min-h-screen pb-32 bg-gray-50">
        <div className="sticky top-0 z-30 bg-white px-6 pt-6 pb-4 shadow-md">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveTab('search')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Icon name="ArrowLeft" size={24} className="text-gray-800" />
            </button>
            <h1 className="text-xl font-bold text-gray-800 flex-1 text-center mr-10">
              {recipe.title}
            </h1>
          </div>
        </div>

        <div className="relative w-full h-64 mb-6">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        <div className="px-6 -mt-10 relative z-20">
          <div className="flex gap-3 mb-6">
            <Card className="flex-1 p-4 border-0 shadow-lg rounded-2xl bg-white text-center">
              <Icon name="Clock" size={24} className="text-orange-500 mx-auto mb-2" />
              <p className="text-xs text-gray-600 mb-1">Время</p>
              <p className="font-bold text-gray-800">{recipe.time}</p>
            </Card>
            <Card className="flex-1 p-4 border-0 shadow-lg rounded-2xl bg-white text-center">
              <Icon name="Star" size={24} className="text-orange-500 mx-auto mb-2" />
              <p className="text-xs text-gray-600 mb-1">Сложность</p>
              <p className="font-bold text-gray-800">{recipe.difficulty}</p>
            </Card>
            <Card className="flex-1 p-4 border-0 shadow-lg rounded-2xl bg-white text-center">
              <Icon name="Flame" size={24} className="text-orange-500 mx-auto mb-2" />
              <p className="text-xs text-gray-600 mb-1">Калории</p>
              <p className="font-bold text-gray-800">{recipe.calories}</p>
            </Card>
          </div>

          <Card className="p-6 border-0 shadow-lg rounded-3xl bg-white mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Icon name="ShoppingBasket" size={24} className="text-orange-500" />
              Ингредиенты
            </h2>
            <div className="space-y-3">
              {recipe.ingredientsDetailed?.map((ingredient, index) => {
                const hasIngredient = selectedIngredients.some((ing) =>
                  ingredient.name.toLowerCase().includes(ing.toLowerCase())
                );
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {hasIngredient ? (
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                          <Icon name="Check" size={16} className="text-green-600" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100">
                          <Icon name="AlertCircle" size={16} className="text-yellow-600" />
                        </div>
                      )}
                      <span className="text-gray-800 font-medium">{ingredient.name}</span>
                    </div>
                    <span className="text-gray-600 text-sm">{ingredient.amount}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg rounded-3xl bg-white mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Icon name="BookOpen" size={24} className="text-orange-500" />
              Инструкция
            </h2>
            <div className="space-y-4">
              {recipe.instructions?.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-2xl">
          <Button
            className={cn(
              'w-full font-bold py-6 rounded-2xl shadow-lg transition-all duration-200 text-lg',
              favorites.includes(recipe.id)
                ? 'bg-gray-200 text-gray-600'
                : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white hover:scale-[1.02]'
            )}
            onClick={() => toggleFavorite(recipe.id)}
          >
            <Icon
              name="Heart"
              size={24}
              className={cn('mr-2', favorites.includes(recipe.id) && 'fill-current')}
            />
            {favorites.includes(recipe.id) ? 'Удалить из избранного' : 'Сохранить в мои рецепты'}
          </Button>
        </div>
      </div>
    );
  };

  const renderIngredients = () => (
    <div className="flex flex-col min-h-screen pb-32 bg-gray-50">
      <div className="sticky top-0 z-30 bg-gradient-to-br from-orange-500 to-pink-500 text-white px-6 pt-8 pb-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setActiveTab('home')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <Icon name="ArrowLeft" size={24} />
          </button>
          <h1 className="text-2xl font-bold">Выберите ингредиенты</h1>
          <div className="w-10" />
        </div>
        
        <div className="relative">
          <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Например, картошка..."
            className="pl-12 py-6 rounded-2xl border-0 bg-white/95 backdrop-blur-sm text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-white/50"
          />
        </div>

        {showSuggestions && searchQuery && filteredIngredients.length > 0 && (
          <Card className="absolute left-6 right-6 mt-2 max-h-64 overflow-y-auto border-0 shadow-2xl rounded-2xl animate-scale-in">
            {filteredIngredients.map((ingredient) => (
              <button
                key={ingredient.name}
                onClick={() => addIngredient(ingredient.name)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors border-b last:border-b-0"
              >
                <span className="text-2xl">{ingredient.icon}</span>
                <span className="text-gray-800 font-medium">{ingredient.name}</span>
                <Icon name="Plus" size={18} className="ml-auto text-orange-500" />
              </button>
            ))}
          </Card>
        )}
      </div>

      <div className="flex-1 px-6 pt-6">
        {selectedIngredients.length > 0 ? (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Выбрано: {selectedIngredients.length}
            </h2>
            <div className="flex flex-wrap gap-3">
              {selectedIngredients.map((ingredient) => {
                const ingredientData = ALL_INGREDIENTS.find((i) => i.name === ingredient);
                return (
                  <Card
                    key={ingredient}
                    className="flex items-center gap-3 pl-4 pr-3 py-3 border-0 shadow-lg rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white animate-scale-in hover:scale-105 transition-transform"
                  >
                    {ingredientData && (
                      <span className="text-2xl">{ingredientData.icon}</span>
                    )}
                    <span className="font-medium">{ingredient}</span>
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <Icon name="X" size={18} />
                    </button>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <div className="text-6xl mb-4">🥘</div>
            <p className="text-gray-500 mb-2">Начните вводить название продукта</p>
            <p className="text-sm text-gray-400 px-8">
              Используйте поиск выше, чтобы добавить ингредиенты из холодильника
            </p>
          </div>
        )}
      </div>

      {selectedIngredients.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-2xl animate-slide-up">
          <Button
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-6 rounded-2xl shadow-lg transition-all duration-200 hover:scale-[1.02] text-lg"
            onClick={() => setActiveTab('search')}
          >
            <Icon name="Search" className="mr-2" size={24} />
            Найти рецепт ({selectedIngredients.length})
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'search' && renderSearch()}
        {activeTab === 'favorites' && renderFavorites()}
        {activeTab === 'categories' && renderCategories()}
        {activeTab === 'ingredients' && renderIngredients()}
        {activeTab === 'recipe' && renderRecipe()}
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
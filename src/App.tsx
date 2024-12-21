import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGame } from '@/hooks/useGame';
import { Forge } from '@/components/Forge';
import { Resources } from '@/components/Resources';
import { Upgrades } from '@/components/Upgrades';
import { Crafting } from '@/components/Crafting';
import { Stats } from '@/components/Stats';
import { PlayerInfo } from '@/components/PlayerInfo';
import { Scroll } from 'lucide-react';

function App() {
  const {
    gameState,
    handleClick,
    purchaseUpgrade,
    purchaseResource,
    startCrafting,
    startAlloyCrafting,
    purchaseAutoClicker,
  } = useGame();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Scroll className="w-8 h-8 text-primary" />
          <h1 className="medieval-title text-4xl">
            Le Forgeron Clicker
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-4 lg:sticky lg:top-4 lg:self-start">
            <PlayerInfo playerLevel={gameState.playerLevel} />
            <Stats
              gold={gameState.gold}
              clickPower={gameState.clickPower}
              autoClickersCount={gameState.autoClickersCount}
              onPurchaseAutoClicker={purchaseAutoClicker}
            />
            <Forge
              onForgeClick={handleClick}
              clickPower={gameState.clickPower}
            />
          </div>

          <div className="min-h-[500px]">
            <Tabs defaultValue="resources" className="space-y-4">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="resources">Ressources</TabsTrigger>
                <TabsTrigger value="crafting">Fabrication</TabsTrigger>
                <TabsTrigger value="upgrades">Améliorations</TabsTrigger>
              </TabsList>

              <TabsContent value="resources" className="mt-6">
                <Resources
                  resources={gameState.resources}
                  gold={gameState.gold}
                  onPurchase={purchaseResource}
                />
              </TabsContent>

              <TabsContent value="crafting" className="mt-6">
                <Crafting
                  items={gameState.items}
                  resources={gameState.resources}
                  alloys={gameState.alloys}
                  craftingSlots={gameState.craftingSlots}
                  playerLevel={gameState.playerLevel}
                  onCraft={startCrafting}
                  onAlloyForge={startAlloyCrafting}
                />
              </TabsContent>

              <TabsContent value="upgrades" className="mt-6">
                <Upgrades
                  upgrades={gameState.upgrades}
                  gold={gameState.gold}
                  onPurchase={purchaseUpgrade}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
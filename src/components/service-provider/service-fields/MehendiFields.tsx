
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Link, X } from "lucide-react";

export function MehendiFields() {
  const [showPortfolioImages, setShowPortfolioImages] = useState(true);
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);

  const handleImageUpload = (url: string) => {
    setPortfolioImages((prev) => [...prev, url]);
  };

  const handleDeleteImage = (indexToDelete: number) => {
    setPortfolioImages((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Style Specialties</Label>
        <Input
          placeholder="e.g., Arabic, Indian, Indo-Arabic"
          required
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Label>Maximum Designs Per Day</Label>
        <Input 
          type="number" 
          required 
          min="1" 
          className="w-full"
        />
      </div>
      
      <div className="space-y-4">
        <Label>Portfolio</Label>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={showPortfolioImages ? "default" : "outline"}
              onClick={() => setShowPortfolioImages(true)}
              className="flex-1"
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Upload Images
            </Button>
            <Button
              type="button"
              variant={!showPortfolioImages ? "default" : "outline"}
              onClick={() => setShowPortfolioImages(false)}
              className="flex-1"
            >
              <Link className="w-4 h-4 mr-2" />
              Portfolio Link
            </Button>
          </div>

          {showPortfolioImages ? (
            <div className="space-y-4">
              <ImageUpload
                onUploadComplete={handleImageUpload}
                className="w-full"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {portfolioImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Input
              type="url"
              placeholder="Enter your portfolio website URL"
              required={!showPortfolioImages}
              className="w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}

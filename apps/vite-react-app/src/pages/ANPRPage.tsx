import React, { useState } from 'react';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { Progress } from '@workspace/ui/components/progress';
import { Badge } from '@workspace/ui/components/badge';
import { Separator } from '@workspace/ui/components/separator';
import { Upload, ImageIcon, Zap, Target, CheckCircle, AlertCircle } from 'lucide-react';

// Type definitions for YOLO11 response format
interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  confidence: number;
  class: string;
  class_id: number;
}

interface ANPRResult {
  license_plate: string;
  confidence: number;
  characters: Array<{
    char: string;
    confidence: number;
    bbox: BoundingBox;
  }>;
}

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  icon: React.ReactNode;
  duration?: number;
}

interface ANPRResponse {
  success: boolean;
  processing_time: number;
  original_image: string;
  steps: {
    detection: {
      status: 'completed' | 'processing' | 'error';
      detections: BoundingBox[];
      cropped_plates: string[];
      processing_time: number;
    };
    recognition: {
      status: 'completed' | 'processing' | 'error';
      results: ANPRResult[];
      processing_time: number;
    };
  };
}

export function ANPRPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [, setCurrentStep] = useState(0);
  const [anprResponse, setAnprResponse] = useState<ANPRResponse | null>(null);

  const processSteps: ProcessStep[] = [
    {
      id: 'upload',
      title: 'Image Upload',
      description: 'Loading and validating image',
      status: 'pending',
      icon: <Upload className="w-5 h-5" />,
    },
    {
      id: 'detection',
      title: 'License Plate Detection',
      description: 'Running YOLO11 model to detect license plates',
      status: 'pending',
      icon: <Target className="w-5 h-5" />,
    },
    {
      id: 'recognition',
      title: 'Character Recognition',
      description: 'Extracting text from detected license plates',
      status: 'pending',
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  const [steps, setSteps] = useState<ProcessStep[]>(processSteps);

  // Dummy data for demonstration
  const dummyResponse: ANPRResponse = {
    success: true,
    processing_time: 2.34,
    original_image: uploadedImage || '',
    steps: {
      detection: {
        status: 'completed',
        detections: [
          {
            x1: 245,
            y1: 123,
            x2: 387,
            y2: 165,
            confidence: 0.94,
            class: 'license_plate',
            class_id: 0,
          },
        ],
        cropped_plates: ['/api/placeholder/150/50'],
        processing_time: 1.12,
      },
      recognition: {
        status: 'completed',
        results: [
          {
            license_plate: 'AB1234CD',
            confidence: 0.87,
            characters: [
              { char: 'A', confidence: 0.95, bbox: { x1: 10, y1: 5, x2: 25, y2: 35, confidence: 0.95, class: 'char', class_id: 0 } },
              { char: 'B', confidence: 0.92, bbox: { x1: 25, y1: 5, x2: 40, y2: 35, confidence: 0.92, class: 'char', class_id: 0 } },
              { char: '1', confidence: 0.89, bbox: { x1: 45, y1: 5, x2: 55, y2: 35, confidence: 0.89, class: 'char', class_id: 0 } },
              { char: '2', confidence: 0.91, bbox: { x1: 55, y1: 5, x2: 65, y2: 35, confidence: 0.91, class: 'char', class_id: 0 } },
              { char: '3', confidence: 0.88, bbox: { x1: 65, y1: 5, x2: 75, y2: 35, confidence: 0.88, class: 'char', class_id: 0 } },
              { char: '4', confidence: 0.93, bbox: { x1: 75, y1: 5, x2: 85, y2: 35, confidence: 0.93, class: 'char', class_id: 0 } },
              { char: 'C', confidence: 0.90, bbox: { x1: 90, y1: 5, x2: 105, y2: 35, confidence: 0.90, class: 'char', class_id: 0 } },
              { char: 'D', confidence: 0.85, bbox: { x1: 105, y1: 5, x2: 120, y2: 35, confidence: 0.85, class: 'char', class_id: 0 } },
            ],
          },
        ],
        processing_time: 1.22,
      },
    },
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!uploadedImage) return;

    setIsProcessing(true);
    setCurrentStep(0);
    setAnprResponse(null);

    // Simulate processing steps
    const newSteps = [...steps];

    // Step 1: Upload
    newSteps[0].status = 'processing';
    setSteps([...newSteps]);
    await new Promise(resolve => setTimeout(resolve, 500));
    newSteps[0].status = 'completed';
    setSteps([...newSteps]);
    setCurrentStep(1);

    // Step 2: Detection
    newSteps[1].status = 'processing';
    setSteps([...newSteps]);
    await new Promise(resolve => setTimeout(resolve, 1500));
    newSteps[1].status = 'completed';
    setSteps([...newSteps]);
    setCurrentStep(2);

    // Step 3: Recognition
    newSteps[2].status = 'processing';
    setSteps([...newSteps]);
    await new Promise(resolve => setTimeout(resolve, 1200));
    newSteps[2].status = 'completed';
    setSteps([...newSteps]);

    setAnprResponse(dummyResponse);
    setIsProcessing(false);
  };

  const getStepIcon = (step: ProcessStep) => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-primary-600" />;
      case 'processing':
        return <div className="w-5 h-5 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return step.icon;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-primary-600';
    if (confidence >= 0.7) return 'bg-accent';
    return 'bg-destructive';
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">ANPR - Automatic Number Plate Recognition</h1>
          <p className="text-muted-foreground">Upload an image to detect and recognize license plates using YOLO11</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Image Upload
              </CardTitle>
              <CardDescription>
                Upload an image containing license plates for recognition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary-300 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="max-h-64 mx-auto rounded-lg shadow-md"
                    />
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedImage(null);
                        setAnprResponse(null);
                        setSteps(processSteps);
                        setCurrentStep(0);
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg font-medium">Drop your image here</p>
                      <p className="text-sm text-muted-foreground">or click to browse</p>
                    </div>
                  </div>
                )}
              </div>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {uploadedImage && (
                <div className="mt-4 space-y-4">
                  <Button
                    onClick={processImage}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? 'Processing...' : 'Process Image'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Process Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Pipeline</CardTitle>
              <CardDescription>
                Step-by-step ANPR processing using YOLO11
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border ${
                      step.status === 'completed' ? 'bg-primary-50 border-primary-200' :
                      step.status === 'processing' ? 'bg-accent-light border-accent' :
                      step.status === 'error' ? 'bg-destructive/5 border-destructive' :
                      'bg-muted border-muted-foreground/20'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {getStepIcon(step)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Badge
                        variant={
                          step.status === 'completed' ? 'default' :
                          step.status === 'processing' ? 'secondary' :
                          step.status === 'error' ? 'destructive' :
                          'outline'
                        }
                      >
                        {step.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {anprResponse && (
          <div className="mt-8 space-y-6">
            <Separator />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Detection Results */}
              <Card>
                <CardHeader>
                  <CardTitle>Detection Results</CardTitle>
                  <CardDescription>
                    License plate detection using YOLO11
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Processing Time:</span>
                      <Badge variant="secondary">{anprResponse.steps.detection.processing_time}s</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {anprResponse.steps.detection.detections.map((detection, index) => (
                        <div key={index} className="p-3 bg-muted rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Plate {index + 1}</span>
                            <Badge className={getConfidenceColor(detection.confidence)}>
                              {(detection.confidence * 100).toFixed(1)}%
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>Bbox: ({detection.x1}, {detection.y1}) - ({detection.x2}, {detection.y2})</div>
                            <div>Class: {detection.class}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm font-medium">Cropped Plates:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {anprResponse.steps.detection.cropped_plates.map((plate, index) => (
                          <img
                            key={index}
                            src={plate}
                            alt={`Cropped plate ${index + 1}`}
                            className="w-full h-12 object-cover rounded border bg-muted"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recognition Results */}
              <Card>
                <CardHeader>
                  <CardTitle>Recognition Results</CardTitle>
                  <CardDescription>
                    Character recognition from detected plates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Processing Time:</span>
                      <Badge variant="secondary">{anprResponse.steps.recognition.processing_time}s</Badge>
                    </div>
                    
                    {anprResponse.steps.recognition.results.map((result, index) => (
                      <div key={index} className="space-y-3">
                        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-mono font-bold text-primary-700">
                              {result.license_plate}
                            </span>
                            <Badge className={getConfidenceColor(result.confidence)}>
                              {(result.confidence * 100).toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <span className="text-sm font-medium">Character Analysis:</span>
                          <div className="grid grid-cols-4 gap-2">
                            {result.characters.map((char, charIndex) => (
                              <div key={charIndex} className="p-2 bg-muted rounded text-center">
                                <div className="font-mono font-bold">{char.char}</div>
                                <div className="text-xs text-muted-foreground">
                                  {(char.confidence * 100).toFixed(0)}%
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Processing Summary</CardTitle>
                  <CardDescription>
                    Overall processing statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Time:</span>
                      <Badge variant="secondary">{anprResponse.processing_time}s</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Plates Detected:</span>
                      <Badge variant="outline">{anprResponse.steps.detection.detections.length}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Plates Recognized:</span>
                      <Badge variant="outline">{anprResponse.steps.recognition.results.length}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge className="bg-primary-600">
                        {anprResponse.success ? 'Success' : 'Failed'}
                      </Badge>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <span className="text-sm font-medium">Performance Breakdown:</span>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Detection</span>
                          <span className="text-muted-foreground">
                            {((anprResponse.steps.detection.processing_time / anprResponse.processing_time) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress 
                          value={(anprResponse.steps.detection.processing_time / anprResponse.processing_time) * 100} 
                          className="h-2"
                        />
                        
                        <div className="flex justify-between text-sm">
                          <span>Recognition</span>
                          <span className="text-muted-foreground">
                            {((anprResponse.steps.recognition.processing_time / anprResponse.processing_time) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress 
                          value={(anprResponse.steps.recognition.processing_time / anprResponse.processing_time) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
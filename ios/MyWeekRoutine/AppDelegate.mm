#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

//Flipper RN Perf Monitor - - -
#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperPerformancePlugin.h>
#endif
// - - -

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //Flipper RN Perf Monitor - - -
  #ifdef FB_SONARKIT_ENABLED
    FlipperClient *client = [FlipperClient sharedClient];
    [client addPlugin:[FlipperPerformancePlugin new]];
  #endif
  // - - -

  self.moduleName = @"MyWeekRoutine";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

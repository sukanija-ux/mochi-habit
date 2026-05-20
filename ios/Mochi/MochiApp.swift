import SwiftUI

@main
struct MochiApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .preferredColorScheme(.light) // app handles its own dark/light
        }
    }
}

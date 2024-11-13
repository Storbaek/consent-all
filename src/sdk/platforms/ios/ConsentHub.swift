import Foundation
import UIKit

@objc public class ConsentHub: NSObject {
    public static let shared = ConsentHub()
    private var config: [String: Any]?
    
    public func initialize(clientId: String, apiKey: String) {
        config = [
            "clientId": clientId,
            "apiKey": apiKey,
            "platform": "ios"
        ]
        
        // Initialize SDK
    }
    
    @objc public func showPreferences(viewController: UIViewController) {
        let preferencesVC = ConsentPreferencesViewController()
        let nav = UINavigationController(rootViewController: preferencesVC)
        viewController.present(nav, animated: true)
    }
    
    @objc public func checkConsent(type: String) -> Bool {
        // Implement consent checking
        return false
    }
    
    @objc public func updateConsent(type: String, granted: Bool) {
        // Implement consent updating
    }
    
    @objc public func requestPushNotificationConsent(completion: @escaping (Bool) -> Void) {
        let center = UNUserNotificationCenter.current()
        center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
            completion(granted)
        }
    }
    
    private func getDeviceInfo() -> [String: Any] {
        return [
            "deviceModel": UIDevice.current.model,
            "osVersion": UIDevice.current.systemVersion,
            "appVersion": Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "unknown"
        ]
    }
}